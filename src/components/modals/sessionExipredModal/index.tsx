import React from 'react';
import Modal from '..';
import Button from '../../button';
import { useMutation } from 'react-query';
import { TAuth } from '../../../services/schemas';
import { AxiosError } from 'axios';
import { refreshToken } from '../../../services/requests';
import { useSetAtom } from 'jotai';
import { refreshTokenAtom, tokenAtom } from '../../../store/authAtoms';

interface ISessionExpiredModal {
	showModal: boolean;
	setShowmodal: React.Dispatch<React.SetStateAction<boolean>>;
	onClickContinue: () => void;
	onClickLeave: () => void;
}

export const SessionExpiredModal = (props: ISessionExpiredModal) => {
	const setToken = useSetAtom(tokenAtom);
	const setRefreshToken = useSetAtom(refreshTokenAtom);
	
	const { mutate: mutateRefreshToken } = useMutation<TAuth, AxiosError>(
		() => refreshToken(), {
			onSuccess: (data) => {
				setToken(data.access_token);
				setRefreshToken(data.refresh_token);
				props.setShowmodal(false);
			}
		}
	);
	
	const renderSessionExpiredModal = (): JSX.Element => {
		return(
			<>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='py-[28px] px-[60px] sm:rounded sm:px-10'>
						<div className='flex items-center justify-center'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#e98923' className='w-[70px] h-[70px]'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' />
							</svg>
						</div>
						<p className='text-base text-[#707070] text-center mt-[15px]'> 
							Your session has expired. Please click 'Continue' to get back in, or 'Leave' to exit. 
						</p>
						<div className='flex flex-row gap-8 justify-center mt-[25px]'>
							<Button variant='primary' className='w-32 px-8 py-1.5' onClick={mutateRefreshToken}>Continue</Button>
							<Button variant='secondary' className='w-32 px-8 py-1.5' onClick={props.onClickLeave}>Leave</Button>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<div>
			<Modal open={props.showModal} onClose={props.setShowmodal} closeable={false} className='sm:max-w-md'>
				{renderSessionExpiredModal()}
			</Modal>
		</div>
	);
};

