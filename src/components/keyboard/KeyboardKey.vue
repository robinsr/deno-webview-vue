<script setup lang="ts">
import { ref, unref } from 'vue';
import { KeySym } from '@keys/key-types.ts';
import { KeyPress } from './types.ts';
import { useFocusIncludes } from './useKeyFocus.ts';

const emit = defineEmits<{
  (e: 'keyClicked', item: KeyPress): void;
}>();

const props = defineProps<{
  symbol: KeySym;
  rowNum: number;
  buttonNum: number;
  gridLeft?: number;
}>();

const el = ref(null);

const { id, name, legend, width, height } = unref(props.symbol);

const $id = ref(id);
const $name = ref(name);
const $cap = ref(legend.cap);
const $width = ref(width);

const profile = 'default';
const $keyId = ref(`${profile}-r${props.rowNum}b${props.buttonNum}`);
const $isActive = useFocusIncludes(new Set([id]));


const handleClick = () => {
  emit('keyClicked', { button: props.symbol.id });
}

const $gridStyles = () => {
  const start = (props.gridLeft || 0) + 1;
  return {
    'grid-column': `${start} / span ${width}`
  }
}
</script>

<template>
  <div ref="el"
      @click="handleClick"
      :data-skbtn="$id"
      :data-skbtnuid="$keyId"
      :class="[
          'ex-hg-button',
          'hg-functionBtn',
          'btn-id-' + $id,
          'btn-name-' + name,
          { 'highlight-btn': $isActive }
      ]"
       :style="$gridStyles()"
  >
    <span>{{ $cap }}</span>
  </div>
</template>

<style>
.ex-hg-button {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0;
  border-bottom: 1px solid #b5b5b5;
  /*border-radius: 5px;*/
  border-radius: calc(0.4vb);

  overflow: hidden;
  text-wrap: nowrap;
  /*font-size: 1.55vi;*/
  font-size: 1.55cqw;

  background-color: var(--default-key-color);
  transition: background-color 0.1s ease-out;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 0 3px -1px rgba(0,0,0,.3);
  box-sizing: border-box;
  cursor: pointer;
  height: 40px;


  &.btn-name-cmd,
  &.btn-name-shift,
  &.btn-name-ctrl,
  &.btn-name-alt {
    background-color: var(--mod-key-color);
    border-bottom-color: color-mix(in srgb, var(--mod-key-color) 50%, #000000 75%);
  }

  &.highlight-btn {

    background-color: color-mix(in srgb, var(--std-key-hl-color) 75%, var(--default-key-color));
    border-bottom-color: color-mix(in srgb, var(--std-key-hl-color) 50%, #000000 50%);

    &.btn-name-cmd {
      background-color: color-mix(in srgb, var(--mod-key1-hl-color) 75%, var(--default-key-color));
      border-bottom-color: color-mix(in srgb, var(--mod-key1-hl-color) 50%, #000000 50%);
    }

    &.btn-name-shift {
      background-color: color-mix(in srgb, var(--mod-key2-hl-color) 75%, var(--default-key-color));
      border-bottom-color: color-mix(in srgb, var(--mod-key2-hl-color) 50%, #000000 50%);
    }

    &.btn-name-ctrl {
      background-color: color-mix(in srgb, var(--mod-key3-hl-color) 75%, var(--default-key-color));
      border-bottom-color: color-mix(in srgb, var(--mod-key3-hl-color) 50%, #000000 50%);
    }

    &.btn-name-alt {
      background-color: color-mix(in srgb, var(--mod-key3-hl-color) 75%, var(--default-key-color));
      border-bottom-color: color-mix(in srgb, var(--mod-key3-hl-color) 50%, #000000 50%);
    }
  }

  .emptySpace {
    pointer-events: none;
    background: none;
    border: none;
    box-shadow: none;
  }
}

</style>