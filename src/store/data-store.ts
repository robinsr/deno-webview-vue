import { defineStore } from 'pinia';
import apps, { ShortcutApp } from '@/shortcuts/ShortcutApp.ts';

export type DataState = {
  apps: Record<string, ShortcutApp>;
  selectedApp: ShortcutApp;
}

const defaultState: DataState = {
  apps: apps,
  selectedApp: apps.testApp,
}

export const useDataStore = defineStore('data-store', {
  state: (): DataState => defaultState,
  getters: {
    appNames: (state) => {
      return Object.keys(state.apps);
    },
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
