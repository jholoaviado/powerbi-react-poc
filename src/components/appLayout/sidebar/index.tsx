/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from 'react-query';
import { classNames } from '../../../utils/common';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { StarIcon, WalletIcon } from '@heroicons/react/16/solid';
import { TGetDashboardsResponse, TGetReportsResponse } from '../../../services/schemas';
import { AxiosError } from 'axios';
import { getDashboards, getReports } from '../../../services/requests';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { activeItemAtom } from '../../../store/powerbiAtoms';
import Tooltip from '../../tooltip';

interface ISidebar {
	isSidebarOpen: boolean;
}

export interface IItem {
	id: string;
	name: string;
	embedUrl: string;
	type: string;
	category: 'featured' | 'workspace';
}

export const Sidebar = (props: ISidebar) => {
	const [items, setItems] = useState<IItem[]>([]);
	const [activeItem, setActiveItem] = useAtom(activeItemAtom);
	
	const featuredItems: IItem[] = [
		{
			id: 'a4acd01d-6a98-4a50-8a6b-b2c010a1a74d',
			name: 'SaaSConsole Dashboard',
			embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a4acd01d-6a98-4a50-8a6b-b2c010a1a74d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
			type: 'Report',
			category: 'featured'
		},
		{
			id: '9798288e-a629-4e51-aec1-7f8b9a5ea768',
			name: 'Financial Sample',
			embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=9798288e-a629-4e51-aec1-7f8b9a5ea768&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
			type: 'Report',
			category: 'featured',
		}
	]
	
	useEffect(() => {
		const sortedFeaturedItems = featuredItems.sort((a, b) => a.name > b.name ? 1 : -1);
		setActiveItem(sortedFeaturedItems[0]);
		setItems([]);
	}, []);
	
	// useEffect(() => {
	// 	if (!activeItem && items) {
	// 		const sortedItems = items.sort((a, b) => a.name > b.name ? 1 : -1);
			
	// 		setActiveItem(sortedItems[0]);
	// 	}
	// }, [items]);

	const { isLoading: isGetReportsLoading } = useQuery<TGetReportsResponse, AxiosError>({
		queryKey: ['reports'],
		queryFn: () => getReports(),
		
		onSuccess: (res) => {
			if (res) {
				console.log('reports:', isGetReportsLoading, res);
				res.value.map((item) => {
					setItems((prevItems) => [
						...prevItems,
						{
							id: item.id,
							name: item.name,
							embedUrl: item.embedUrl,
							type: 'Report',
							category: 'workspace'
						},
					]);
				});
			}
		},
	});
	
	const { isLoading: isGetDashbopardsLoading } = useQuery<TGetDashboardsResponse, AxiosError>({
		queryKey: ['dashboards'],
		queryFn: () => getDashboards(),
		
		onSuccess: (res) => {
			if (res) {
				console.log('dashboards:', isGetDashbopardsLoading, res);
				res.value.map((item) => {
					setItems((prevItems) => [
						...prevItems,
						{
							id: item.id,
							name: item.displayName,
							embedUrl: item.embedUrl,
							type: 'Dashboard',
							category: 'workspace'
						},
					]);
				});
			}
		},
	});

	const renderReports = (items: IItem[]) => {
		const sortedItems = items.sort((a, b) => a.name > b.name ? 1 : -1);
		
		return (
			<div className='flex flex-col w-full h-full gap-4'>
				{sortedItems.map((item) => {
					return (
						<div className='flex flex-row py-1 group' key={`${item.category}-${item.id}`}>
							<Tooltip
								className='bg-yellow-500 text-white text-xs p-2 whitespace-nowrap z-50'
								message={item.name}
								position='right'
								isVisible={!props.isSidebarOpen}
							>
								<div className={classNames( 
									(activeItem && activeItem.id == item.id && activeItem.category == item.category) ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500',
									'flex flex-shrink-0 justify-center items-center p-1.5 w-8 h-8 rounded-full border-2 group-hover:border-yellow-500'
								)}>
									<DocumentChartBarIcon
										className='w-full h-full cursor-pointer'
										onClick={() => setActiveItem(item)}
									/>
								</div>
							</Tooltip>

							<div
								className={classNames(
									props.isSidebarOpen ? 'visible' : 'hidden',
									'flex flex-col w-full h-8 ml-4 text-nowrap cursor-pointer'
								)}
								onClick={() => setActiveItem(item)}
							>
								<h1 className='text-sm font-semibold'>
									{item.name}
								</h1>
								<p className='text-xs italic'>{item.type}</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div
			className={classNames(
				'absolute flex flex-shrink-0 flex-row bg-transparent w-full h-full overflow-y-scroll no-scrollbar transition-all duration-500 ease-in-out'
			)}
		>

			
			<div
				className={classNames(
					props.isSidebarOpen ? 'w-[350px]' : 'w-[60px]',
					'absolute flex flex-shrink-0 flex-col pt-[70px] p-4 bg-[#38393c] h-fit min-h-full gap-4 transition-all duration-500 ease-in-out z-40'
				)}
			>
				<div className={classNames(
					'flex items-center'
				)}> 					
					<Tooltip
						className='bg-yellow-500 text-white text-xs p-2 whitespace-nowrap z-50'
						message='Featured'
						position='right'
						isVisible={!props.isSidebarOpen}
					>
						<StarIcon className='w-8 h-8 text-gray-400' />
					</Tooltip>
					
					<p className={classNames(
						'px-4 text-white font-bold text-nowrap',
						props.isSidebarOpen ? 'visible' : 'hidden'
					)}> 
						Featured 
					</p> 
					
					<hr className={classNames(
						'flex-grow border-t border-gray-300',
						props.isSidebarOpen ? 'visible' : 'hidden'
					)} /> 
				</div> 	
				
				{ renderReports(featuredItems) }

				<div className={classNames(
					'flex items-center'
				)}> 					
					<Tooltip
						className='bg-yellow-500 text-white text-xs p-2 whitespace-nowrap z-50'
						message='My Workspace'
						position='right'
						isVisible={!props.isSidebarOpen}
					>
						<WalletIcon className='w-8 h-8 text-gray-400' />
					</Tooltip>
					
					<p className={classNames(
						'px-4 text-white font-bold text-nowrap',
						props.isSidebarOpen ? 'visible' : 'hidden'
					)}> 
						My Workspace 
					</p> 
					
					<hr className={classNames(
						'flex-grow border-t border-gray-300',
						props.isSidebarOpen ? 'visible' : 'hidden'
					)} /> 
				</div> 

				<p className={classNames(
					'px-4 italic text-xs text-center text-nowrap',
					(props.isSidebarOpen && items.length < 1) ? 'visible' : 'hidden'
				)}> 
					Your workspace is empty.
				</p>				
				
				{renderReports(items)} 
			</div>
		</div>
	);
};
