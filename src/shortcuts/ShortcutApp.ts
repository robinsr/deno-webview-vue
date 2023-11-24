import { type KeySym } from '@keys/key-types.ts';
import { mapKeySymbols } from '@keys/symbol.ts';
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwzyz', 10);

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
  id?: string;
  name: string;
  groupings: ItemGroup<Shortcut>[]
}

export type HotKeyGroup = {
  name: string;
  groupings: ItemGroup<HotKey>[]
}


export class ShortcutApp implements HotKeyGroup {
  id: string;
  name: string;
  groupNames: string[];
  groupings: HotKeyGroup['groupings'];
  hotkeys: HotKey[];

  constructor(app: ShortcutGroup) {
    this.id = app.id || nanoid(10);
    this.name = app.name;
    this.groupNames = app.groupings.map(g => g.name);

    this.groupings = app.groupings.map(({ name, items }) => ({
        name, items: items.map(({ label, keys }) => ({
          id: nanoid(8), label, keys, symbols: mapKeySymbols(keys)
        }))
      })
    );

    this.hotkeys = this.groupings.flatMap(g => g.items);
  }

  matchKey(key: string): HotKey[] {
    return this.hotkeys.filter(hk => {
      return !!hk.symbols.find(sym => sym.matches(key))
    });
  }
}


import ghDesktop from './apps/github-desktop.shortcuts.ts';
import sublimeText from './apps/sublime.hotkeys.ts';
import testApp from './apps/test-app.shortcuts.ts';

const apps: Record<string, ShortcutApp> = [
  new ShortcutApp(testApp),
  new ShortcutApp(ghDesktop),
  new ShortcutApp(sublimeText),
].reduce((acc, app) => {
  return { ...acc, [app.id]: app }
}, {});

console.trace(apps);

export default apps;
