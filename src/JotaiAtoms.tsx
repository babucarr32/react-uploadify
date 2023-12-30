/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'jotai';

import { DetailsType, ErrorType } from 'types';

export const imagesToSave = atom<Blob[]>([]);
export const jotaiImages = atom<string[]>([]);
export const jotaiLimitCount = atom<number>(1);
export const jotaiFileLimit = atom<number>(100);
export const jotaiFileSizeLimit = atom<string>("");
export const jotaiError = atom<ErrorType>({message: ""})
export const jotaiDetails = atom<DetailsType[]>([{type: "", size: 0}])