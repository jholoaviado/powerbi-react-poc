import { IPublicClientApplication } from '@azure/msal-browser';

export const login = async (instance: IPublicClientApplication) => {
	
	const request = {
		prompt: 'select_account',
		scopes: ['offline_access', 'https://analysis.windows.net/powerbi/api/.default'],
	};
	
	// instance
	// 	.loginPopup(loginRequest)
	// 	.then((loginResponse) => {
	// 		console.log('loginResponse', loginResponse);
	// 		return loginResponse
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	
	const response = await instance.loginPopup(request);
	
	return response
}

export const getAccessToken = async (instance: IPublicClientApplication) => {
	const request = {
		prompt: 'select_account',
		scopes: ['offline_access', 'https://analysis.windows.net/powerbi/api/.default'],
	};
	
	const response = await instance.acquireTokenSilent(request);
	
	return response.accessToken
}