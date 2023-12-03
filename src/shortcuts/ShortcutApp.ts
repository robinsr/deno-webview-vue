import { type KeySym } from '@keys/key-types.ts';
import { mapKeySymbols, combinators } from '@keys/symbol.ts';
import { nanoid } from "@/utils/nanoid.ts";

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

const modKeyOrder = [ '{meta}', '{ctrl}', '{alt}', '{shift}' ];
const sortModKeys = (symA: KeySym, symB: KeySym): number => {
  const oA = modKeyOrder.indexOf(symA.id);
  const oB = modKeyOrder.indexOf(symB.id);
  return oA > oB ? -1 : oA < oB ? 1 : 0;
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
          id: nanoid(8), label, keys,
          symbols: mapKeySymbols(keys.split(combinators.space_or_plus)).sort(sortModKeys)
        }))
      })
    );

    this.hotkeys = this.groupings.flatMap(g => g.items);
  }

  /**
   * Returns a list of {@link HotKey}s (keyboard shortcuts) that
   * use the provided key
   * @param key
   */
  matchKey(key: string): HotKey[] {
    return this.hotkeys.filter(hk => {
      return !!hk.symbols.find(sym => sym.matches(key))
    });
  }
}
