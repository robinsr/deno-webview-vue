import { ref, computed, inject } from 'vue';
import { type Ref } from 'vue';
import { injectFocus } from '../../providers/inject.ts';
import { FocusState } from './types.ts';

const getSymbols = (keyfocus: FocusState): string[] => {
  switch(keyfocus.focus) {
    case 'hotkey':
      return keyfocus.hotkey.symbols.map(sym => sym.id);
    case 'key':
      return [ keyfocus.key.id ];
    case 'none':
    default:
      return [];
  }
}

const default_focus: FocusState = { focus: 'none' };


export function useFocusIncludes(keyIds: Set<string>): boolean {
  const keyfocus = inject<Ref<FocusState>>(injectFocus, ref(default_focus));

  return computed((): boolean => {
    const  symbols = getSymbols(keyfocus.value);

    if (symbols.length) {
      return Array.from(keyIds).filter(id => !symbols.includes(id)).length === 0;
    } else {
      return false;
    }
  });
}

export function useFocusMatches(keyIds: Set<string>): boolean {
  const keyfocus = inject<Ref<FocusState>>(injectFocus, ref(default_focus));

  return computed((): boolean => {
    const symbols = getSymbols(keyfocus.value);

    if (symbols.length && symbols.length === keyIds.size) {
      return symbols.filter(id => !keyIds.has(id)).length === 0;
    } else {
      return false;
    }
  });
}