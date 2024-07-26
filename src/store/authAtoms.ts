import { atom } from 'jotai';

const getTokenFromLocalStorage = () => {
	const initialToken = '';

	const token = localStorage.getItem('token');

	if (token) {
		return token;
	}

	return initialToken;
};

const getRefreshTokenFromLocalStorage = () => {
	const initialRefreshToken = '';

	const refreshToken = localStorage.getItem('refreshToken');

	if (refreshToken) {
		return refreshToken;
	}

	return initialRefreshToken;
};

const getHomeAccountIdFromLocalStorage = () => {
	const initialHomeAccountId = '';

	const homeAccountId = localStorage.getItem('homeAccountId');

	if (homeAccountId) {
		return homeAccountId;
	}

	return initialHomeAccountId;
};

const getUserNameFromLocalStorage = () => {
	const initialUserName = '';

	const userName = localStorage.getItem('userName');

	if (userName) {
		return userName;
	}

	return initialUserName;
};

const getUserEmailFromLocalStorage = () => {
	const initialUserEmail = '';

	const userEmail = localStorage.getItem('userEmail');

	if (userEmail) {
		return userEmail;
	}

	return initialUserEmail;
};

const currentToken = atom<string>(getTokenFromLocalStorage());
const currentRefreshToken = atom<string>(getRefreshTokenFromLocalStorage());
const currentHomeAccountId = atom<string>(getHomeAccountIdFromLocalStorage());
const currentUserName = atom<string>(getUserNameFromLocalStorage());
const currentUserEmail = atom<string>(getUserEmailFromLocalStorage());

export const tokenAtom = atom(
	(get) => get(currentToken),
	(_, set, data: string) => {
		set(currentToken, data);
		localStorage.setItem('token', data)
	},
);

export const refreshTokenAtom = atom(
	(get) => get(currentRefreshToken),
	(_, set, data: string) => {
		set(currentRefreshToken, data);
		localStorage.setItem('refreshToken', data)
	},
);

export const homeAccountIdAtom = atom(
	(get) => get(currentHomeAccountId),
	(_, set, data: string) => {
		set(currentHomeAccountId, data);
		localStorage.setItem('homeAccountId', data)
	},
);


export const userNameAtom = atom(
	(get) => get(currentUserName),
	(_, set, data: string) => {
		set(currentUserName, data);
		localStorage.setItem('userName', data)
	},
);

export const userEmailAtom = atom(
	(get) => get(currentUserEmail),
	(_, set, data: string) => {
		set(currentUserEmail, data);
		localStorage.setItem('userEmail', data)
	},
);

export const isTokenExpired = atom<boolean>(true);
