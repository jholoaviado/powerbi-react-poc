import { Outlet } from 'react-router-dom';
import { Topbar } from './topbar';
import { Sidebar } from './sidebar';
import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

export const AppLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	
	return (
		<div className='flex flex-col w-screen h-screen'>
			<Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			
			<AuthenticatedTemplate>
				<Sidebar isSidebarOpen={isSidebarOpen} />

				<div className='flex flex-grow w-full h-full'>				
					<div className='flex flex-col w-full h-full bg-background'>
						<div className='flex-grow ml-[60px] overflow-hidden'>
							<Outlet />
						</div>
					</div>
				</div>
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<div className='flex flex-col w-full h-full justify-center items-center'>
					<p className='px-20 py-2 text-4xl text-center'>
						This page appears to be empty.
					</p>
					<p className='px-20 py-2 text-4xl text-center'>
						To view the desired content, please log in to your account.
					</p>
				</div>
			</UnauthenticatedTemplate>
		</div>
	);
}