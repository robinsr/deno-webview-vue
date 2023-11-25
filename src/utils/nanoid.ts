import { customAlphabet } from 'nanoid';

const ALPHA ='1234567890abcdefghijklmnopqrstuvwzyz';
export const _nanoid = customAlphabet(ALPHA, 10);

export const nanoid = (length = 10) => {
  return _nanoid(length);
}

