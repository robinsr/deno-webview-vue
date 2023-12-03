<script setup lang="ts">
import lightCSS from 'xel/themes/adwaita.css?inline';
import darkCSS from 'xel/themes/adwaita-dark.css?inline';

import { computed, watchPostEffect, onBeforeMount } from 'vue';
import { createStyleSheet } from '@/styles/style-util.ts';
import { useMediaQuery } from '@/hooks/useMediaQuery.ts';
import { useStore } from '@/store/app-store.ts';

import UISwitch from './components/UISwitch.vue';


let lightSheet: CSSStyleSheet;
let darkSheet: CSSStyleSheet;

onBeforeMount(() => {
  lightSheet = createStyleSheet(lightCSS, true);
  darkSheet = createStyleSheet(darkCSS, true);
});

const store = useStore();
const $darkMode = computed(() => {
  return store.theme.useDarkMode;
});

const setColorScheme = (scheme: string) => {
  document.documentElement.setAttribute('color-scheme', scheme);
}

useMediaQuery("(prefers-color-scheme: dark)", (e: MediaQueryListEvent) => {
  if (e.matches !== $darkMode.value) {
    store.toggleDarkMode();
  }
});

watchPostEffect(() => {
  switch($darkMode.value) {
    case true:
      darkSheet.disabled = false;
      lightSheet.disabled = true;
      setColorScheme('dark');
      break;
    case false:
    default:
      darkSheet.disabled = true;
      lightSheet.disabled = false;
      setColorScheme('light');
  }
});

</script>

<template>
  <UISwitch
      label="Dark mode"
      :val="$darkMode"
      @on-toggle="store.toggleDarkMode" />
</template>

<style scoped>

</style>