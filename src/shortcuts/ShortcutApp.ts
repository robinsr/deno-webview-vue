import { type KeySym } from '@keys/key-types.ts';
import { mapKeySymbols } from '@keys/symbol.ts';
import { nanoid } from 'nanoid';

export type Maybe<T> = T | null;

export type Shortcut = {
  label: string;
  keys: string;
}

export type HotKey = Shortcut & {
  symbols: KeySym[];
  id: string
};

type ItemGroup<T> = {
  name: string;
  items: T[]
}

export type ShortcutGroup = {
  name: string;
  groupings: ItemGroup<Shortcut>[]
}

export type HotKeyGroup = {
  name: string;
  groupings: ItemGroup<HotKey>[]
}


class ShortcutApp implements HotKeyGroup {
  name: string;
  groupNames: string[];
  groupings: HotKeyGroup['groupings']

  constructor(app: ShortcutGroup) {
    this.name = app.name;
    this.groupNames = app.groupings.map(g => g.name);

    this.groupings = app.groupings.map(({ name, items }) => ({
        name, items: items.map(({ label, keys }) => ({
          id: nanoid(8), label, keys, symbols: mapKeySymbols(keys)
        }))
      })
    );
  }
}


import ghDesktop from './apps/github-desktop.shortcuts.ts';
import sublimeText from './apps/sublime.hotkeys.ts';
import testApp from './apps/test-app.shortcuts.ts';

const apps = {
  'github_desktop': new ShortcutApp(ghDesktop),
  'sublime': new ShortcutApp(sublimeText),
  'testApp': new ShortcutApp(testApp),
}

export default apps;
