import { type HotKey, ShortcutApp } from '../shortcuts/ShortcutApp.ts';
import { KeySym } from "@keys/key-types.ts";

export interface AppState {
  debug: boolean;
  theme: {
    useDarkMode: boolean;
  },
  data: {
    apps: Record<string, ShortcutApp>;
    selectedApp: ShortcutApp;
    focusState: KBFocusState;
  }
}

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

export type KBFocusState = NothingFocused | HotkeyFocus | KeyboardKeyFocus;
export type SetFocusState = KBFocusState['focus'];
