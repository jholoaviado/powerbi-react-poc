import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';

interface ITopbar {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (e: boolean) => void;
}

export const Topbar = (props: ITopbar) => {

	return (
		<div className={`flex justify-between items-center w-full h-[70px] p-4 bg-[#38393c] top-0 sticky z-50`}>
			<div className='flex justify-center items-center gap-4'>
				{
					props.isSidebarOpen ?
						<XCircleIcon
							className='w-8 h-8 cursor-pointer'
							onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
						/>
						:
						<Bars3Icon
							className='w-8 h-8 cursor-pointer'
							onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
						/>
				}
				
				<p className='text-xl font-extrabold text-yellow-500'>PowerBI Reports</p>
			</div>
		</div>
	)
}