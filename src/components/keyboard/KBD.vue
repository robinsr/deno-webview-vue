<script setup lang="ts">
import { ref, unref } from 'vue';
import { KeySym } from '@keys/key-types.ts';

const props = defineProps<{
  symbols: KeySym[];
  scale?: number;
  useColors?: boolean;
}>();

const vKey = ref<string>(props.symbols.map(sym => sym.id).join('-'));

const $symbols: KeySym[] = unref(props.symbols)

const getScale = () => {
  if (!props.scale) {
    return null;
  }

  return {
    'display': 'block',
    'transform-origin': '8% 40%',
    'transform': `scale(${props.scale}%)`,
  }
}

</script>

<template>
  <span :data-keys="vKey" :style="getScale()">
    <kbd v-for="$s in $symbols" :key="$s.id" :class="{
      ['key-' + $s.type]: true,
      ['key-' + $s.name]: true,
      'kbd-color': props.useColors,
    }">
      {{ $s.legend.kbd }}
    </kbd>
  </span>
</template>

<style scoped>
kbd {
  --kbd-border-color: rgba(0, 0, 0, 1.0);

  font-size: 1.0em;
  border: 1px solid var(--kbd-border-color);
  border-radius: 2px;
  margin-left: 0.25em;
  margin-right: 0.25em;
  padding: 0.125em 0.25em 0.125em 0.25em;
  color: var(--kb-text-color);

  background-color: color-mix(in srgb, var(--boulder) 10%, var(--background-color) 100%);

  &.key-mod,
  &.key-ws,
  &.key-arrow {
    font-size: 1.2em;
  }

  &.kbd-color.key-cmd {
    background-color: color-mix(in srgb, var(--mod1-bg-color) 100%, var(--kb-bg-color) 20%);
  }

  &.kbd-color.key-shift {
    background-color: color-mix(in srgb, var(--mod2-bg-color) 100%, var(--kb-bg-color) 20%);
  }

  &.kbd-color.key-ctrl {
    background-color: color-mix(in srgb, var(--mod3-bg-color) 100%, var(--kb-bg-color) 20%);
  }

  &.kbd-color.key-alt {
    background-color: color-mix(in srgb, var(--mod4-bg-color) 100%, var(--kb-bg-color) 20%);
  }
}
</style>