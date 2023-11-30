import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
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

export type KeyboardSettings = {
  kbDisplay: KeyDisplayMode;
  showSections: string[];
}

export type ViewState = {
  keyboard: {
    spec: KeyboardSpec;
    settings: KeyboardSettings;
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


export const useViewStore = defineStore('view-store', () => {
  const focusState = ref<KBFocusState>({ target: 'none' });

  const keyboard = ref<{
    spec: KeyboardSpec;
    settings: KeyboardSettings
  }>(initialState.keyboard);

  const focus = computed(() => {
    return focusState.value.target;
  });

  const keys = computed(() => {
    switch (focusState.value.target) {
      case 'hotkey':
        return focusState.value.hotkey.symbols;
      case 'key':
        return [ focusState.value.key ];
      case 'none':
      default:
        return [];
    }
  });

  const keyIds = computed(() => {
    switch (focusState.value.target) {
      case 'hotkey':
        return focusState.value.hotkey.symbols.map(key => key.id);
      case 'key':
        return [ focusState.value.key.id ];
      case 'none':
      default:
        return [];
    }
  });

  const hotkey = computed(() => {
    if (focusState.value.target === 'hotkey') {
      return focusState.value.hotkey;
    } else {
      return null;
    }
  });

  const setFocus = (target: KBFocusTarget, data?: HotKey | KeySym) => {
    switch (target) {
      case 'hotkey':
        return focusState.value = {
          target, hotkey: data as HotKey
        };
      case 'key':
        return focusState.value = {
          target, key: data as KeySym
        };
      case 'none':
        return focusState.value = {
          target: 'none'
        }
    }
  };

  const setKeyboardMode = (mode?: KeyDisplayMode) => {
    const { settings } = keyboard.value;

    if (mode) {
      return settings.kbDisplay = mode;
    }

    const modes = [
      'regular' as const,
      'inlay' as const
    ];

    settings.kbDisplay = modes.find(m => m !== settings.kbDisplay)!;
  };

  const toggleSection = (section: string) => {
    console.log('Toggling section:', section);
    const { settings } = keyboard.value;
    let current = settings.showSections;

    if (current.includes(section)) {
      current = current.toSpliced(current.indexOf(section), 1);
      current = current.filter(s => s !== section);
    } else {
      current = [ ...current, section ];
    }

    settings.showSections = current;
  };

  return {
    keyboard, focusState,
    focus, keys, keyIds, hotkey,
    setFocus, setKeyboardMode, toggleSection
  }
})