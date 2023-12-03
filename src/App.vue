<script setup lang="ts">
import { useStore } from '@/store/app-store.ts';
import { useViewStore } from '@/store/view-store.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import { useWindowListener, useHotKey, isKbEvent, logKey } from '@/hooks/useWindowListener.ts';

import MenuBar from './components/ui/MenuBar.vue';
import StyleGUI from './components/ui/StyleGUI.vue'

type InAppHotkey = {
  hotkey: string;
  handler: (...args: any) => void;
}

const store = useStore();
const viewStore = useViewStore();

const blockKeys: string[] = [];
useHotKey('cmd+k', (e: KeyboardEvent) => {
  //logKey('toggleDarkMode', e);
  store.toggleDarkMode();
  e.preventDefault();
  e.stopImmediatePropagation();
  blockKeys.push('Meta');
});

useWindowListener('keyup', (e: object) => {
  if (isKbEvent(e)) {
    //logKey('keyFocusListener', e);

    if (e.key === blockKeys.at(-1)) {
      return blockKeys.pop();
    }

    const symbol = SYMBOL_MAP.find(e.key, false);
    if (!symbol.matches('unknown')) {
      viewStore.setFocus('key', symbol);
    }
  }
});



</script>

<template>
  <MenuBar />
  <router-view id="app-content" />
  <StyleGUI/>
</template>

<style scoped>
#app-content {
  height: calc(100% - 0px);
  margin: 0 auto;
  padding: 0;
}
</style>

<style src="./styles/colors.css"/>
<style src="./styles/fonts.css"/>
