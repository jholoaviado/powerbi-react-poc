import { useQuery } from 'react-query';
import { classNames } from '../../../utils/common'
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { TGetReportsResponse } from '../../../services/schemas';
import { AxiosError } from 'axios';
import { getReports } from '../../../services/requests';

interface ISidebar {
	isSidebarOpen: boolean;
}

export const Sidebar = (props: ISidebar) => {

	const { isLoading } = useQuery<TGetReportsResponse, AxiosError>({
		queryKey: ['reports'],
		queryFn: () => getReports(),
		onSuccess: (res) => {
			if (res) {
				console.log('reports:', isLoading, res)
			}
		}
	});
	
	return (
		<div className={classNames(
			props.isSidebarOpen ? 'w-[250px]' : 'w-[60px]',
			'absolute flex flex-shrink-0 flex-row pt-[65px] p-4 bg-[#38393c] h-full gap-4 overflow-hidden transition-all duration-500 ease-in-out'
		)}>
			<div className='absolute flex flex-shrink-0 justify-center items-center mt-1 p-1.5 w-8 h-8 bg-yellow-500 rounded-full'>
				<DocumentChartBarIcon
					className='w-full h-full cursor-pointer text-white'
					// onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
				/>
			</div>
			
			<div className={classNames(
				props.isSidebarOpen ? 'visible' : 'hidden',
				'flex flex-col w-full h-8 ml-12 text-nowrap'
			)}>
				<h1 className='text-sm'>SaaSConsole Dashboard</h1>
				<p className='text-xs'>Report</p>
			</div>
		</div>
	)
}