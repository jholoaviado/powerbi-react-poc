/* eslint-disable react-hooks/exhaustive-deps */
import *  as pbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../../store/authAtoms';
import { activeItemAtom } from '../../store/powerbiAtoms';
import { useEffect } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';

declare global {
	interface Window {
		report: Report
	}
}

export const PowerBIReport = () => {
	const isAuthenticated = useIsAuthenticated();
	
	// const [report, setReport] = useState<Report | null>(null);
	
	const token = useAtomValue(tokenAtom);
	const activeItem = useAtomValue(activeItemAtom);
	
	const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

	
	useEffect(() => {
		const reportContainer = document.getElementById("reportEmbedded");
		if (activeItem && reportContainer) {
			powerbi.reset(reportContainer);
		
			const config = {
				type: activeItem?.type.toLowerCase(),
				id: activeItem?.id,
				embedUrl: activeItem?.embedUrl,
				accessToken: token,
				tokenType: models.TokenType.Aad,
				settings: {
					panes: {
						filters: {
							expanded: false,
							visible: false
						}
					},
					// layoutType: models.LayoutType.MobilePortrait
					// background: models.BackgroundType.Transparent,
				}
			}
			
			const report = powerbi.embed(reportContainer, config) as Report;
			console.log(report);
		}
	}, [isAuthenticated, token, activeItem])
	
	const renderPowerBIEmbeddings = () => {
		return (
			<PowerBIEmbed
				cssClassName = { "w-full h-full" }

				embedConfig = {{
					type: activeItem?.type.toLowerCase(),
					id: activeItem?.id,
					embedUrl: activeItem?.embedUrl,
					accessToken: token,
					tokenType: models.TokenType.Aad,
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: false
							}
						},
						// layoutType: models.LayoutType.MobilePortrait
						// background: models.BackgroundType.Transparent,
					}
				}}

				eventHandlers = {
					new Map([
						['loaded', function () {console.log('Report loaded');}],
						['rendered', function () {console.log('Report rendered');}],
						['error', function (event) {console.log(event?.detail);}],
						['visualClicked', () => console.log('visual clicked')],
						['pageChanged', (event) => console.log(event)],
					])
				}
				
				getEmbeddedComponent = { (embeddedReport) => {
					window.report = embeddedReport as Report;
				}}
			/>
		)
	} 
	
	return (
		<>
			{ (isAuthenticated && activeItem && token) && renderPowerBIEmbeddings() }
		</>
	)
}