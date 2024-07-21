import Container from './container';
import { RouteObject } from 'react-router-dom';
import { Home } from '../../pages/home';

export const Routes: RouteObject = {
	path: '/',
	element: <Container />,
	children: [
		{
			path: '/',
			element: <Home />,
		},
	]
}