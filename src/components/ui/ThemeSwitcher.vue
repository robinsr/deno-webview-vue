<script setup lang="ts">
import lightCSS from 'xel/themes/adwaita.css?inline';
import darkCSS from 'xel/themes/adwaita-dark.css?inline';

import { computed, watchPostEffect, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store/app-store.ts';
import UISwitch from './components/UISwitch.vue';


const makeStyleSheet = (content: string): CSSStyleSheet => {
  const newSheet = new CSSStyleSheet({ disabled: true });
  newSheet.replaceSync(content);
  document.adoptedStyleSheets.push(newSheet);
  return newSheet;
}

let lightSheet: CSSStyleSheet;
let darkSheet: CSSStyleSheet;

onBeforeMount(() => {
  lightSheet = makeStyleSheet(lightCSS);
  darkSheet = makeStyleSheet(darkCSS);
});

const store = useStore();
const $darkMode = computed(() => {
  return store.theme.useDarkMode;
});

const setColorScheme = (scheme: string) => {
  document.documentElement.setAttribute('color-scheme', scheme);
}

const mql = window.matchMedia("(prefers-color-scheme: dark)");
const mqlListener = (e: MediaQueryListEvent) => {
  if (e.matches !== $darkMode.value) {
    store.toggleDarkMode()
  }
}

onMounted(() => {
  mql.addEventListener("change", mqlListener);
});

onUnmounted(() => {
  mql.removeEventListener("change", mqlListener);
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