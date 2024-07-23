import Container from './container';
import { RouteObject } from 'react-router-dom';
import { Home } from '../../pages/home';
import { MicrosoftAuthCallback } from '../../pages/callback';

export const Routes: RouteObject = {
	path: '/',
	element: <Container />,
	children: [
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/home',
			element: <Home />,
		},
		{
			path: '/redirect',
			element: <MicrosoftAuthCallback />,
		},
	]
}