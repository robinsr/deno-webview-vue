<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store/app-store.ts';
import { useViewStore } from '@/store/view-store.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import hotkeys from 'hotkeys-js';

import MenuBar from './components/ui/MenuBar.vue';
import AppsProvider from './providers/AppsProvider.vue';

type InAppHotkey = {
  hotkey: string;
  handler: (...args: any) => void;
}

const store = useStore();
const viewStore = useViewStore();

const logKey = (handler: string, e: KeyboardEvent) => {
  const { type, key, code } = e;
  console.debug(handler, { type, key, code }, e);
}

const blockKeys: string[] = [];

const toggleDarkMode: InAppHotkey = {
  hotkey: 'cmd+k',
  handler: (e: KeyboardEvent, _handler: unknown) => {
    logKey('toggleDarkMode', e);
    store.toggleDarkMode();
    e.preventDefault();
    e.stopImmediatePropagation();
    blockKeys.push('Meta');
  }
}

const keyFocusListener = (e: KeyboardEvent) => {
  logKey('keyFocusListener', e);

  if (e.key === blockKeys.at(-1)) {
    return blockKeys.pop();
  }

  const symbol = SYMBOL_MAP.find(e.key, false);
  if (!symbol.matches('unknown')) {
    viewStore.setFocus('key', symbol);
  }
}



onMounted(() => {
  hotkeys(toggleDarkMode.hotkey, { keyup: true, keydown: true }, toggleDarkMode.handler)
  window.addEventListener('keyup', keyFocusListener);
});

onUnmounted(() => {
  hotkeys.unbind(toggleDarkMode.hotkey)
  window.removeEventListener('keyup', keyFocusListener);

});


</script>

<template>
  <AppsProvider>
    <MenuBar />
    <section id="app-content">
      <router-view />
    </section>
  </AppsProvider>
</template>

<style>
#app-content {
  margin: 35px auto;
  padding: 0px 70px;

  --catskill-white: rgba(237, 245, 247, 1.0);
  --mine-shaft: rgba(39, 39, 39, 1.0);
  --boulder: rgba(124, 124, 124, 1.0);
  --scorpion: rgba(91, 91, 91, 1.0);
  --fuchsia-blue: rgba(129, 86, 201, 1.0);
  --keppel: rgba(54, 187, 153, 1.0);
  --orange-peel: rgba(245, 159, 0, 1.0);
  --flamingo: rgba(240, 62, 62, 1.0);
}
</style>
