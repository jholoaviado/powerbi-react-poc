/* eslint-disable react-hooks/exhaustive-deps */
import { useSetAtom } from 'jotai';
import { refreshTokenAtom, tokenAtom } from '../../store/authAtoms';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { TAuth } from '../../services/schemas';
import { AxiosError } from 'axios';
import { tokenExchange } from '../../services/requests';
import { useMutation } from 'react-query';

export const MicrosoftAuthCallback = () => {
	const setToken = useSetAtom(tokenAtom);
	const setRefreshToken = useSetAtom(refreshTokenAtom);
	
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const authRef = useRef(false);
	const googleCode = searchParams.get('code');
	
	useEffect(() => {
		if (authRef.current === false) {
			authorizeUser(googleCode || '');
			return () => {
				authRef.current = true;
			};
		}
	}, []);
	
	const { mutate: authorizeUser } = useMutation<TAuth, AxiosError, string>(
		(code) => tokenExchange(code),
		{
			onSuccess: (data) => {
				if (data.access_token) {
					console.log('data', data)
					setToken(data.access_token);
					setRefreshToken(data.refresh_token);
					navigate('/');
				}
			},
			onError: (error) => {
				console.error(error);
			}
		}
	);
	
	return (<div className='w-full h-screen bg-[#F6F6F6]'>Loading...</div>);
}