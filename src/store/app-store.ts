import { defineStore } from 'pinia';
import apps, { HotKey } from '@/shortcuts/ShortcutApp.ts';
import { AppState, KBFocusState, SetFocusState } from '@/store/types.ts';
import { KeySym } from '@keys/key-types.ts';

const defaultState: AppState = {
  debug: false,
  theme: {
    useDarkMode: true
  },
  data: {
    apps: apps,
    selectedApp: apps.testApp,
    focusState: {
      focus: 'none'
    }
  }
}

export const useStore = defineStore('app-store', {
  state: (): AppState => defaultState,
  getters: {
    appNames: (state) => {
      return Object.keys(state.data.apps);
    },
    focus: (state): SetFocusState => {
      return state.data.focusState.focus;
    },
    keys: (state): KeySym[] => {
      switch (state.data.focusState.focus) {
        case 'hotkey':
          return state.data.focusState.hotkey.symbols;
        case 'key':
          return [ state.data.focusState.key ];
        case 'none':
        default:
          return [];
      }
    },
    keyIds: (state): string[] => {
      switch (state.data.focusState.focus) {
        case 'hotkey':
          return state.data.focusState.hotkey.symbols.map(key => key.id);
        case 'key':
          return [ state.data.focusState.key.id ];
        case 'none':
        default:
          return [];
      }
    },
    hotkey: (state): HotKey | null => {
      if (state.data.focusState.focus === 'hotkey') {
        return state.data.focusState.hotkey;
      } else {
        return null;
      }
    }
  },
  actions: {
    setSelectedApp(nameOrId: string) {
      const apps = Object.values(this.data.apps);
      const appIds = Object.keys(this.data.apps);
      const appNames = apps.map(app => app.name);

      if (appIds.includes(nameOrId)) {
        this.data.selectedApp = this.data.apps[nameOrId];
      } else if (appNames.includes(nameOrId)) {
        this.data.selectedApp = apps.find(a => a.name === nameOrId)!;
      }
    },

    setFocus(focus: SetFocusState, data?: HotKey | KeySym) {
      let newState: KBFocusState = { focus: 'none' };

      if (focus === 'hotkey') {
        newState = { focus: 'hotkey', hotkey: data as HotKey };
      }

      if (focus === 'key') {
        newState = { focus: 'key', key: data as KeySym };
      }

      this.data.focusState = newState;
    }
  }
});
