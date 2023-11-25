<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store/app-store.ts';
import { useViewStore } from '@/store/view-store.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import hotkeys from 'hotkeys-js';

import MenuBar from './components/ui/MenuBar.vue';

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
    <MenuBar />
    <section id="app-content">
      <router-view />
    </section>
</template>

<style scoped>
#app-content {
  margin: 35px auto;
  padding: 0px 70px;
}
</style>

<style module="colors">
:global(:root) {
  --catskill-white: rgb(237, 245, 247);
  --boulder: rgb(124, 124, 124);
  --scorpion: rgb(91, 91, 91);
  --mine-shaft: rgb(39, 39, 39);
  --fuchsia-blue: rgb(129, 86, 201);
  --curious-blue: rgb(28, 126, 214);
  --keppel: rgb(54, 187, 153);
  --orange-peel: rgb(245, 159, 0);
  --flamingo: rgb(240, 62, 62);
}
</style>
