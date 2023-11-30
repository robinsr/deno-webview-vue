import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { HotKey, ShortcutApp } from '@/shortcuts/ShortcutApp.ts';

import ghDesktop from '@data/github-desktop.shortcuts.ts';
import sublimeText from '@data/sublime.hotkeys.ts';
import testApp from '@data/test-app.shortcuts.ts';

export type Apps = Record<string, ShortcutApp>;
export type DataState = {
  apps: Apps;
  selectedApp: ShortcutApp;
}

const shortcutApps: Apps = [
  new ShortcutApp(testApp),
  new ShortcutApp(ghDesktop),
  new ShortcutApp(sublimeText),
].reduce((acc, app) => {
  return { ...acc, [app.id]: app }
}, {});

const defaultState: DataState = {
  apps: shortcutApps,
  selectedApp: Object.values(shortcutApps).at(0)!,
}

export const useDataStore = defineStore('data-store', () => {
  const apps = ref<Apps>(defaultState.apps);
  const selectedApp = ref<ShortcutApp>(defaultState.selectedApp);

  const appList = Object.values(apps.value);
  const appNames = Object.values(apps.value).map(app => app.name);
  const appIds = Object.keys(apps.value);

  const allCommands = computed(() => selectedApp.value.hotkeys);

  const setSelectedApp = (nameOrId: string) => {
    if (appIds.includes(nameOrId)) {
      selectedApp.value = apps.value[nameOrId];
    } else if (appNames.includes(nameOrId)) {
      selectedApp.value = appList.find(a => a.name === nameOrId)!;
    }
  }

  return {
    apps, selectedApp,
    appList, appNames, allCommands,
    setSelectedApp
  }
});
