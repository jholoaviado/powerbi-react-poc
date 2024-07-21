import { Outlet } from 'react-router-dom';
import { Topbar } from './topbar';
import { Sidebar } from './sidebar';
import { useState } from 'react';

export const AppLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	
	return (
		<div className='flex flex-col w-screen h-screen'>
			<Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			<Sidebar isSidebarOpen={isSidebarOpen} />

			<div className='flex flex-grow w-full h-full'>				
				<div className='flex flex-col w-full h-full bg-background'>
					<div className='flex-grow ml-[60px] overflow-hidden'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}