import { CLIENT_ID, REDIRECT_URI } from '../constants';

export const msalConfig = {
	auth: {
		clientId: CLIENT_ID,
		redirectUri: REDIRECT_URI,
		authority: 'https://login.microsoftonline.com/organizations',
		postLogoutRedirectUri: '/',
		navigateToLoginRequestUrl: false,
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: false,
	},
};
