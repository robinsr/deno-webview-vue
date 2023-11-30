<script setup lang="ts">
import { ref, unref } from 'vue';
import { KeySym } from '@keys/key-types.ts';

const props = defineProps<{
  symbols: KeySym[];
  scale?: number;
  useColors?: boolean;
  fontSize?: string;
}>();

const vKey = ref<string>(props.symbols.map(sym => sym.id).join('-'));

const $symbols: KeySym[] = unref(props.symbols)

const getScale = () => {
  return props.scale ?  {
    'display': 'block',
    'transform-origin': '8% 40%',
    'transform': `scale(${props.scale}%)`,
  } : {};
}

const getTextSize = () => {
  return props.fontSize ? {
    'font-size': props.fontSize
  } : {
    'font-size': '1.0em'
  }
}

</script>

<template>
  <span :data-keys="vKey" :style="getScale()">
    <kbd v-for="$s in $symbols"
         :key="$s.id"
         :style="[ getTextSize() ]"
         :class="{
      ['key-' + $s.type]: true,
      ['key-' + $s.name]: true,
      'kbd-color': props.useColors,
    }">
      {{ $s.legend.kbd }}
    </kbd>
  </span>
</template>

<style scoped>
:global([color-scheme="dark"]) {
  --kbd-bg-color: var(--mine-shaft);
  --kbd-border-color: var(--scorpion);
}

:global([color-scheme="light"]) {
  --kbd-bg-color: var(--catskill-white);
  --kbd-border-color: var(--boulder);
}

kbd {
  border: 0.05em solid var(--keycap-border-color);
  border-radius: 2px;
  margin-right: 0;
  padding: 0.125em 0.25em 0.125em 0.25em;
  color: var(--keycap-text-color);

  + kbd {
    margin-left: 0.25em;
  }

  --save-this-background-color: var(--kbd-bg-color);
  background-color: color-mix(in srgb, var(--keycap-bg-color) 10%, var(--background-color) 100%);

  &.key-mod,
  &.key-ws,
  &.key-arrow {
    font-size: 1.2em;
  }

  &.kbd-color.key-cmd {
    background-color: color-mix(in srgb, var(--mod1-bg-color) 100%, var(--keycap-bg-color) 20%);
  }

  &.kbd-color.key-shift {
    background-color: color-mix(in srgb, var(--mod2-bg-color) 100%, var(--keycap-bg-color) 20%);
  }

  &.kbd-color.key-ctrl {
    background-color: color-mix(in srgb, var(--mod3-bg-color) 100%, var(--keycap-bg-color) 20%);
  }

  &.kbd-color.key-alt {
    background-color: color-mix(in srgb, var(--mod4-bg-color) 100%, var(--keycap-bg-color) 20%);
  }
}
</style>