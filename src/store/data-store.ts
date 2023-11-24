import { defineStore } from 'pinia';
import apps, { HotKey, ShortcutApp } from '@/shortcuts/ShortcutApp.ts';

export type DataState = {
  apps: Record<string, ShortcutApp>;
  selectedApp: ShortcutApp;
}

const defaultState: DataState = {
  apps: apps,
  selectedApp: Object.values(apps).at(0)!,
}

export const useDataStore = defineStore('data-store', {
  state: (): DataState => defaultState,
  getters: {
    appList: (state): ShortcutApp[] => {
      return Object.values(state.apps);
    },
    appNames: (state): string[] => {
      return Object.values(state.apps).map(app => app.name);
    },
    allCommands: (state): HotKey[] => {
      return state.selectedApp.hotkeys;
    }
  },
  actions: {
    setSelectedApp(nameOrId: string) {
      const apps = Object.values(this.apps);
      const appIds = Object.keys(this.apps);
      const appNames = apps.map(app => app.name);


      if (appIds.includes(nameOrId)) {
        this.selectedApp = this.apps[nameOrId];
      } else if (appNames.includes(nameOrId)) {
        this.selectedApp = apps.find(a => a.name === nameOrId)!;
      }
    }
  }
});
