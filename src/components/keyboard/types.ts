import { type HotKey } from '../../shortcuts/ShortcutApp.ts';
import { KeySym } from "@keys/key-types.ts";

type NothingFocused = {
  focus: 'none';
};

type HotkeyFocus = {
  focus: 'hotkey';
  hotkey: HotKey;
}

type KeyboardKeyFocus = {
  focus: 'key';
  key: KeySym;
}

export type FocusState = NothingFocused | HotkeyFocus | KeyboardKeyFocus;

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