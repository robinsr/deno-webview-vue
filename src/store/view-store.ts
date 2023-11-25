import { defineStore } from 'pinia';
import type { HotKey } from '@/shortcuts/ShortcutApp.ts';
import type { KeySym } from "@keys/key-types.ts";

type KeyboardMode = 'regular' | 'inlay';

type NothingFocused = {
  target: 'none';
};

type HotkeyFocus = {
  target: 'hotkey';
  hotkey: HotKey;
}

type KeyboardKeyFocus = {
  target: 'key';
  key: KeySym;
}

export type KBFocusState = NothingFocused | HotkeyFocus | KeyboardKeyFocus;
export type KBFocusTarget = KBFocusState['target'];

export type ViewState = {
  keyboard: {
    mode: KeyboardMode;
    show: string[];
  }
  focusState: KBFocusState;
}

const initialState: ViewState = {
  keyboard: {
    mode: 'regular',
    show: [
      'main',
      'control-pad',
      'arrow-keys',
      'numpad',
    ]
  },
  focusState: {
    target: 'none'
  }
}


export const useViewStore = defineStore('view-store', {
  state: (): ViewState => initialState,
  getters: {
    focus: (state): KBFocusTarget => {
      return state.focusState.target;
    },
    keys: (state): KeySym[] => {
      switch (state.focusState.target) {
        case 'hotkey':
          return state.focusState.hotkey.symbols;
        case 'key':
          return [ state.focusState.key ];
        case 'none':
        default:
          return [];
      }
    },
    keyIds: (state): string[] => {
      switch (state.focusState.target) {
        case 'hotkey':
          return state.focusState.hotkey.symbols.map(key => key.id);
        case 'key':
          return [ state.focusState.key.id ];
        case 'none':
        default:
          return [];
      }
    },
    hotkey: (state): HotKey | null => {
      if (state.focusState.target === 'hotkey') {
        return state.focusState.hotkey;
      } else {
        return null;
      }
    }
  },
  actions: {
    setFocus(target: KBFocusTarget, data?: HotKey | KeySym) {
      switch (target) {
        case 'hotkey':
          return this.focusState = {
            target, hotkey: data as HotKey
          };
        case 'key':
          return this.focusState = {
            target, key: data as KeySym
          };
        case 'none':
          return this.focusState = {
            target: 'none'
          }
      }
    },
    setKeyboardMode(mode?: KeyboardMode) {
      const modes = [ 'regular' as const, 'inlay' as const ];
      if (mode) {
        this.keyboard.mode = mode;
      } else {
        modes.splice(modes.indexOf(this.keyboard.mode), 1);
        this.keyboard.mode = modes[0];
      }
    }
  }
})