import { IPublicClientApplication } from '@azure/msal-browser';

export const login = async (instance: IPublicClientApplication) => {
	
	const request = {
		prompt: 'select_account',
		scopes: ['offline_access', 'https://analysis.windows.net/powerbi/api/.default'],
	};
	
	const response = await instance.loginPopup(request);
	
	return response
}

export const getAccessToken = async (instance: IPublicClientApplication) => {
	const request = {
		prompt: 'select_account',
		scopes: ['openid', 'profile', 'offline_access', 'https://analysis.windows.net/powerbi/api/.default'],
	};
	
	const response = await instance.acquireTokenSilent(request);
	
	return response.accessToken
}

export const logout = async (instance: IPublicClientApplication, homeAccountId: string) => {
	// const logoutRequest = {
	// 	account: instance.getAccountByHomeId(homeAccountId),
	// 	postLogoutRedirectUri: '/',
	// };
	
	const currentAccount = instance.getAccountByHomeId(homeAccountId);
	
	console.log('currentAccount', currentAccount);
	
	instance.logoutPopup({ account: currentAccount });
}