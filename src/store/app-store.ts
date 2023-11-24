import { defineStore } from 'pinia';
import type { ViewState } from '@/store/view-store.ts';
import type { DataState } from '@/store/data-store.ts';


export interface AppState {
  debug: boolean;
  theme: {
    useDarkMode: boolean;
  },
  // data: DataState;
  // view: ViewState;
}

const defaultState: AppState = {
  debug: false,
  theme: {
    useDarkMode: true
  }
}

export const useStore = defineStore('app-store', {
  state: (): AppState => defaultState,
  getters: {

  },
  actions: {
    toggleDarkMode() {
      this.theme.useDarkMode = !this.theme.useDarkMode;
    },
    toggleDebug() {
      this.debug = !this.debug;
    }
  }
});
