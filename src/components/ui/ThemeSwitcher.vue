<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import UISwitch from './components/UISwitch.vue';
import * as light from 'xel/themes/adwaita.css?inline';
import * as dark from 'xel/themes/adwaita-dark.css?inline';


const makeStyleSheet = (content: string): CSSStyleSheet => {
  const newSheet = new CSSStyleSheet({ disabled: true });
  newSheet.replaceSync(content);

  document.adoptedStyleSheets.push(newSheet);

  return newSheet;
}

let lightSheet = makeStyleSheet(light.default);
let darkSheet = makeStyleSheet(dark.default);

const darkMode = ref<boolean>(false);

watchEffect(() => {
  const useDark = darkMode.value;
  darkSheet.disabled = useDark;
  lightSheet.disabled = !useDark;
});

</script>

<template>
  <UISwitch label="Dark mode" :val="darkMode" @toggled="darkMode = !darkMode" />
</template>

<style scoped>

</style>