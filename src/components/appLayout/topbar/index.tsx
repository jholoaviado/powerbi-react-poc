import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../button';
import { classNames } from '../../../utils/common';
// import { useAtomValue } from 'jotai';
// import { tokenAtom } from '../../../store/authAtoms';
// import { AUTH_URL } from '../../../constants';
import { login } from '../../../utils/msal';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useAtom, useSetAtom } from 'jotai';
import { tokenAtom, userEmailAtom, userNameAtom } from '../../../store/authAtoms';
import { useNavigate } from 'react-router-dom';

interface ITopbar {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (e: boolean) => void;
}

export const Topbar = (props: ITopbar) => {
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	
	const navigate = useNavigate();
	
	const setToken = useSetAtom(tokenAtom);
	const [userName, setUserName] = useAtom(userNameAtom);
	const [userEmail, setUserEmail] = useAtom(userEmailAtom);
	
	const handleSignIn = async () => {
		const response = await login(instance);
		setToken(response?.accessToken);
		setUserName(response?.account?.name || '');
		setUserEmail(response?.account?.username || '');
		navigate('/home');
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
			
			{/* <a href={AUTH_URL}> */}
			<Button
				variant='primary'
				className={classNames(
					'px-8 py-1 text-sm rounded-full',
					(isAuthenticated) ? 'hidden' : 'visible'
				)}
				onClick={() => handleSignIn()}
			>
				Sign In
			</Button>
			
			{/* </a> */}

			<div className={classNames(
				'flex flex-col items-end',
				(isAuthenticated) ? 'visible' : 'hidden'
			)}>
				<p className='font-semibold'>{userName}</p>
				<p className='italic text-xs'>{userEmail}</p>
			</div>
		</div>
	)
}