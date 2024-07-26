import { Bars3Icon, PowerIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../button';
import { classNames } from '../../../utils/common';
import { login, logout } from '../../../utils/msal';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useAtom, useSetAtom } from 'jotai';
import { homeAccountIdAtom, tokenAtom, userEmailAtom, userNameAtom } from '../../../store/authAtoms';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../tooltip';

interface ITopbar {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (e: boolean) => void;
}

export const Topbar = (props: ITopbar) => {
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	
	const navigate = useNavigate();
	
	const setToken = useSetAtom(tokenAtom);
	const [homeAccountId, setHomeAccountId] = useAtom(homeAccountIdAtom);
	const [userName, setUserName] = useAtom(userNameAtom);
	const [userEmail, setUserEmail] = useAtom(userEmailAtom);
	
	const handleSignIn = async () => {
		const response = await login(instance);
		setToken(response?.accessToken);
		setHomeAccountId(response?.account?.homeAccountId);
		setUserName(response?.account?.name || '');
		setUserEmail(response?.account?.username || '');
		navigate('/home');
	}

	const handleSignOut = async () => {
		await logout(instance, homeAccountId);
		// localStorage.clear();
		// sessionStorage.clear();
		// navigate('/');
	}
	
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
				
				<p className='text-xl font-extrabold text-yellow-500'>PowerBI File Directory</p>
			</div>
			
			<div className={classNames(
				'flex items-center',
				(isAuthenticated) ? 'gap-4' : ''
			)}>
				<UnauthenticatedTemplate>
					{/* <a href={AUTH_URL}> */}
					<Button
						variant='primary'
						className={classNames(
							'px-8 py-1 text-sm rounded-full',
							// (isAuthenticated) ? 'hidden' : 'visible'
						)}
						onClick={() => handleSignIn()}
					>
						Sign In
					</Button>
					
					{/* </a> */}
				</UnauthenticatedTemplate>
				
				<AuthenticatedTemplate>
					<div className={classNames(
						'hidden lg:flex flex-col items-end',
						// (isAuthenticated) ? 'visible' : 'hidden'
					)}>
						<p className='font-semibold'>{userName}</p>
						<p className='italic text-xs'>{userEmail}</p>
					</div>
					
					<Tooltip
						className='bg-yellow-500 text-white text-xs p-2 whitespace-nowrap z-50'
						message='Sign Out'
						position='left'
						isVisible={!props.isSidebarOpen}
					>
						<div className={classNames( 
							'flex flex-shrink-0 justify-center items-center p-1.5 w-8 h-8 bg-red-500 rounded-full border-2 group-hover:bg-red-700 cursor-pointer',
							// (isAuthenticated) ? 'visible' : 'hidden'
						)}>
							<PowerIcon
								className='text-white w-full h-full'
								onClick={() => handleSignOut()}
							/>
						</div>
					</Tooltip>
				</AuthenticatedTemplate>
			</div>
		</div>
	)
}