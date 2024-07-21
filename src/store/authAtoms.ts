import { atom } from 'jotai';

const getTokenFromLocalStorage = () => {
	const initialToken = '';

	const token = localStorage.getItem('token');

	if (token) {
		return token;
	}

	return initialToken;
};


const currentToken = atom<string>(getTokenFromLocalStorage())

export const tokenAtom = atom(
	(get) => get(currentToken),
	(_, set, data: string) => {
		set(currentToken, data);
		localStorage.setItem('token', data)
	},
);