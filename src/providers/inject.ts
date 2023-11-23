import type { InjectionKey, Ref } from 'vue';
import { HotKeyGroup } from "../shortcuts/ShortcutApp.ts";
import { KBFocusState } from '../store/types.ts';
import { HotKeysDB } from './db.ts';

export const injectApps = Symbol() as InjectionKey<Record<string, HotKeyGroup>>;
export const injectDexie = Symbol() as InjectionKey<HotKeysDB>;

export const injectFocus = Symbol() as InjectionKey<Ref<KBFocusState>>;

