<script setup lang="ts">
import { computed, watchEffect, useCssModule } from 'vue';
import GUI from 'GUI';
import { useStore } from '@/store/app-store.ts';
import { createStyleSheet } from '@/styles/style-util.ts';

import colors from '@/styles/colors.css?inline';

const colorsSheet = createStyleSheet(colors, false);

const rootStyles = Array.from(colorsSheet.cssRules)
    .filter(r => (r as CSSStyleRule).selectorText === ':root')
    .flatMap(r => {
      const vars: string[] = [];
      (r as CSSStyleRule).styleMap.forEach((_val, key) => vars.push(key));
      return vars;
    })

console.log(rootStyles);

const ROOT = document.querySelector(':root')!;
const store = useStore();

const config = {
  enabled: true
};

const gui = new GUI({ title: 'All CSS Variables' }).close();

gui.add(config, 'enabled').name('enabled-controller');

const cssVars = computed(() => store.theme.cssVars);

watchEffect(() => {
  const storeVars = cssVars.value;

  const ctrls = gui.controllers.map(ctrl => ctrl._name);

  Object.entries(storeVars).forEach(([ name, val ]) => {
    console.log(name, val);
  })

  Object.keys(storeVars).forEach(cVar => {
    if (ctrls.includes(cVar)) {
      const ctrl = gui.controllers.find(ctrl => ctrl._name == cVar);
      const ctrlVal = ctrl.getValue();

      // update GUI value;
      if (ctrlVal !== storeVars[cVar]) {
        ctrl.setValue(storeVars[cVar]);
        getComputedStyle(ROOT).setProperty(cVar, storeVars[cVar]);
      }

      return;
    }

    const val = getComputedStyle(ROOT).getPropertyValue(cVar);
    store.updateCssVar(cVar, val);
    gui.add(storeVars, cVar).name(cVar).onChange(console.log);
    console.log(`Adding CSS var "${cVar}" with initial value "${val}"`);
  });
})
</script>

<template>
</template>

