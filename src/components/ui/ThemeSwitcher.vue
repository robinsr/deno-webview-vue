<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from '@/store/app-store.ts';

import UISwitch from './components/UISwitch.vue';
import lightCSS from 'xel/themes/adwaita.css?inline';
import darkCSS from 'xel/themes/adwaita-dark.css?inline';

const store = useStore();

const makeStyleSheet = (content: string): CSSStyleSheet => {
  const newSheet = new CSSStyleSheet({ disabled: true });
  newSheet.replaceSync(content);
  document.adoptedStyleSheets.push(newSheet);
  return newSheet;
}

let lightSheet = makeStyleSheet(lightCSS);
let darkSheet = makeStyleSheet(darkCSS);

const darkMode = store.theme.useDarkMode;

const onToggleDarkMode = () => {
  store.theme.useDarkMode = !store.theme.useDarkMode;
}

watchEffect(() => {
  const useDark = store.theme.useDarkMode;
  darkSheet.disabled = !useDark;
  lightSheet.disabled = useDark;
});

</script>

<template>
  <UISwitch label="Dark mode" :val="darkMode" @on-toggle="onToggleDarkMode" />
</template>

<style scoped>

</style>