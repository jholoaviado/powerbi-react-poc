import { atom } from 'jotai';
import { IItem } from '../components/appLayout/sidebar';

export const activeItemAtom = atom<IItem | null>(null);