/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from 'react-query';
import { classNames } from '../../../utils/common';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
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
}

export const Sidebar = (props: ISidebar) => {
	const [items, setItems] = useState<IItem[]>([]);
	const [activeItem, setActiveItem] = useAtom(activeItemAtom);
	
	useEffect(() => {
		setItems([]);
	}, []);
	
	useEffect(() => {
		if (!activeItem && items) {
			const sortedItems = items.sort((a, b) => a.name > b.name ? 1 : -1);
			
			setActiveItem(sortedItems[0])
		}
	}, [items])

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
						},
					]);
				});
			}
		},
	});

	const renderReports = () => {
		const sortedItems = items.sort((a, b) => a.name > b.name ? 1 : -1);
		
		return (
			<div className='flex flex-col w-full h-full gap-4'>
				{sortedItems.map((item) => {
					return (
						<div className='flex flex-row py-1 group' key={item.id}>
							<Tooltip
								className='bg-yellow-500 text-white text-xs p-2 whitespace-nowrap z-10'
								message={item.name}
								position='right'
								isVisible={!props.isSidebarOpen}
							>
								<div className={classNames( 
									(activeItem && activeItem.id == item.id) ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500',
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
				// props.isSidebarOpen ? 'w-[350px]' : 'w-[60px]',
				'absolute flex flex-shrink-0 flex-row bg-transparent w-full h-full overflow-y-scroll no-scrollbar transition-all duration-500 ease-in-out'
			)}
		>
			<div
				className={classNames(
					props.isSidebarOpen ? 'w-[350px]' : 'w-[60px]',
					'absolute flex flex-shrink-0 flex-row pt-[65px] p-4 bg-[#38393c] h-fit gap-4 transition-all duration-500 ease-in-out'
				)}
			>
				{renderReports()}
			</div>
		</div>
	);
};
