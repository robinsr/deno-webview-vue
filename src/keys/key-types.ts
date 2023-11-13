import { KeySym } from './keyboard-symbol.ts';

export type Shortcut = {
  label: string;
  keys: string;
}

export type HotKey = Shortcut & {
  symbols: KeySym[];
  highlighted?: boolean
};

export type ItemGroup<T> = {
  name: string;
  groups: {
    [group: string]: T[]
  }
}

export type ShortcutGroup = ItemGroup<Shortcut>;
export type HotKeyGroup = ItemGroup<HotKey>;

export type KeyboardConfig = {
  layout: {
    default: string[];
    shift?: string[];
  },
  display?: {
    [keyIdentifier: string]: string
  }
}

