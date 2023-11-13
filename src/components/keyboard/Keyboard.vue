<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { pick } from 'lodash';
import Keyboard from 'simple-keyboard';
import "simple-keyboard/build/css/index.css";
import keyConfigs, { shared, keyList } from '../../keys/keyboard-config.ts';
import { KeySym } from '../../keys/keyboard-symbol.ts';

import { shim  } from 'set.prototype.difference';
shim();
console.log(Set.prototype);

type KeyEl = {
  id: string;
  className: string;
  tagName: string;
  data: {
    [prop: string]: string;
  }
}

export type KeyPress = KeyEl & {
  button: string;
}

const props = withDefaults(defineProps<{
  keys: KeySym[]
}>(), {
  keys: []
});

const emit = defineEmits<{
  (e: 'onKeyPress', key: KeyPress): void;
}>();

const keyRef = ref(null);

const onKeyPress = (button: string, event: PointerEvent) => {
  const targetProps = pick(event.target, [ 'id', 'className', 'tagName' ]);
  emit('onKeyPress', { button, ...targetProps, data: { ...event.target.dataset }});
}

const BtnHighlightCls = 'highlight-btn';

onMounted(() => {

  const keyboards = keyConfigs.map(([ name, opts ]) => {
      return [ `.simple-keyboard-${name}`, {
        onKeyPress, ...shared, ...opts
      } ]
    })
    .map(([ clsName, config ]) => {
      return new Keyboard(clsName, config);
    });

  const mainKey = keyboards[0];

  const update = (keys: KeySym[]) => {
    console.log('Updating keyboard:', keys);
    const addHighlight = keys.map(s => s.idVariants.join(' ')).join(' ') || '';
    const removeHighLight = Array.from(keyList.difference(new Set(addHighlight))).join(' ');

    console.log(`Keyboard: adding "${addHighlight}", Removing: "${removeHighLight}"`);

    mainKey.dispatch(kb => {
      kb.removeButtonTheme(removeHighLight, BtnHighlightCls);
      kb.addButtonTheme(addHighlight, BtnHighlightCls);
    });
  };

  watchEffect(() => {
    update(props.keys);
  })
})
</script>

<template>
    <main class="keyboardContainer" ref="keyRef">
        <div class="simple-keyboard-main"></div>

        <div class="controlArrows">
            <div class="simple-keyboard-control"></div>
            <div class="simple-keyboard-arrows"></div>
        </div>

        <div class="numPad">
            <div class="simple-keyboard-numpad"></div>
            <div class="simple-keyboard-numpadEnd"></div>
        </div>
    </main>
</template>

<style scoped>

</style>