import { defineStore } from 'pinia';
import type { HotKey } from '@/shortcuts/ShortcutApp.ts';
import type { KeySym, KeyboardSpec } from "@keys/key-types.ts";
import Keyboards from '@keys/keyboard-config.ts';

type KeyDisplayMode = 'regular' | 'inlay';

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
    spec: KeyboardSpec;
    settings: {
      kbDisplay: KeyDisplayMode;
      showSections: string[];
    }
  }
  focusState: KBFocusState;
}

const defaultKb: KeyboardSpec = Keyboards['apple_MB110LL'];

const initialState: ViewState = {
  keyboard: {
    spec: Keyboards['apple_MB110LL'],
    settings: {
      kbDisplay: 'regular',
      showSections: Object.values(defaultKb.sections).map(s => s.name)
    }
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
    setKeyboardMode(mode?: KeyDisplayMode) {
      const modes = [ 'regular' as const, 'inlay' as const ];
      const current = this.keyboard.settings.kbDisplay;
      if (mode) {
        this.keyboard.settings.kbDisplay = mode;
      } else {
        modes.splice(modes.indexOf(current), 1);
        this.keyboard.settings.kbDisplay = modes[0];
      }
    },
    toggleSection(section: string) {
      console.log('Toggling section:', section);
      let current = this.keyboard.settings.showSections;

      if (current.includes(section)) {
        current = current.filter(s => s !== section);
      } else {
        current = [ ...current, section ];
      }

      this.keyboard.settings.showSections = current;
    }
  }
})