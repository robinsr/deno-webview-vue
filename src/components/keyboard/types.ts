import { type HotKey } from '../../shortcuts/ShortcutApp.ts';
import { KeySym } from "@keys/key-types.ts";

export type FocusState = {
  focus: 'none';
} | {
  focus: 'hotkey';
  hotkey: HotKey;
} | {
  focus: 'key';
  key: KeySym;
}

export type KeyEl = {
  id: string;
  className: string;
  tagName: string;
  data: {
    [prop: string]: string;
  }
}

export type KeyPress = {
  button: string;
}