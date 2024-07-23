import { CLIENT_ID } from '../constants';

export const msalConfig = {
	auth: {
		clientId: CLIENT_ID,
		authority: 'https://login.microsoftonline.com/organizations',
		redirectUri: 'http://localhost:5173',
		postLogoutRedirectUri: '/',
		navigateToLoginRequestUrl: false,
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: false,
	},
};
