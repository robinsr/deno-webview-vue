import { ref, computed, inject } from 'vue';
import { type Ref } from 'vue';
import { injectFocus } from '../../providers/inject.ts';
import { FocusState } from './types.ts';

const log = (...msg: any[]) => {
  console.debug(`%c ${msg}`, 'background: #222; color: #bada55');
}

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

export function useFocusIncludesOne(keyIds: Set<string>): boolean {
  const keyfocus = inject<Ref<FocusState>>(injectFocus, ref(default_focus));

  return computed((): boolean => {
    // This form is intended only for focus on a single key,
    // and should not match on single-key shortcuts
    if (keyfocus.value.focus !== 'key') {
      return false;
    }

    const symbols = getSymbols(keyfocus.value);

    if (symbols.length === 1) {
      const match = Array.from(keyIds).includes(symbols[0]);
      if (match) {
        console.debug("IncludesOne:", symbols, keyIds, match);
      }
      return match;
    } else {
      return false;
    }
  });
}

export function useFocusIncludesAll(keyIds: Set<string>): boolean {
  const keyfocus = inject<Ref<FocusState>>(injectFocus, ref(default_focus));

  return computed((): boolean => {
    const symbols = getSymbols(keyfocus.value);

    if (symbols.length) {
      const remainingKeyIds = Array.from(keyIds).filter(id => !symbols.includes(id));
      if (remainingKeyIds.length === 0) {
        console.debug("IncludesAll:", symbols, keyIds, remainingKeyIds);
      }
      return remainingKeyIds.length === 0;
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
      const difference = symbols.filter(id => !keyIds.has(id))
      if (difference.length === 0) {
        console.debug("Matches", symbols, keyIds, difference);
      }
      return difference.length === 0;
    } else {
      return false;
    }
  });
}