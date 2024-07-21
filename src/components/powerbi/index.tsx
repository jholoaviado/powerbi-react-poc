import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../../store/authAtoms';
import { activeItemAtom } from '../../store/powerbiAtoms';

declare global {
	interface Window {
		report: Report
	}
}

export const PowerBIReport = () => {
	const token = useAtomValue(tokenAtom);
	const activeItem = useAtomValue(activeItemAtom);
	
	const renderPowerBIEmbeddings = () => {
		return (
			<PowerBIEmbed
				cssClassName = { "w-full h-full" }

				embedConfig = {{
					type: activeItem?.type.toLowerCase(),
					id: activeItem?.id,
					embedUrl: activeItem?.embedUrl,
					accessToken: token,
					tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: false
							}
						},
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
			{ activeItem && renderPowerBIEmbeddings() }
		</>
	)
}