import type { InjectionKey, Ref } from 'vue';
import { HotKeyGroup } from "@/shortcuts/ShortcutApp.ts";
import { FocusState } from '../components/keyboard/types.ts';

export const injectApps = Symbol() as InjectionKey<Record<string, HotKeyGroup>>;

export const injectFocus = Symbol() as InjectionKey<Ref<FocusState>>;

