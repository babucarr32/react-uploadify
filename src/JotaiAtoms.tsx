/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'jotai';

export const uploadedPostImg = atom<string[]>([]);
export const imagesToSave = atom<Blob[]>([]);
