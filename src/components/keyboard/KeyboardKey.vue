<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { KeySym } from '@keys/key-types.ts';
import { useStore } from '@/store/app-store.ts';
import KeyInfo from './KeyInfo.vue';

const store = useStore();

const emit = defineEmits<{
  (e: 'keyClicked', item: { button: string; }): void;
}>();

const props = defineProps<{
  symbol: KeySym;
  rowNum: number;
  buttonNum: number;
  gridLeft?: number;
}>();

const el = ref(null);

const { id, name, legend, width, height, offset } = unref(props.symbol);

const $id = ref(id);
const $name = ref(name);
const $cap = ref(legend.cap);

const profile = 'default';
const $dataKeyId = ref(`${profile}-r${props.rowNum}b${props.buttonNum}`);

const $isActive = computed(() => {
  return store.keyIds.includes(id);
});

const $showInfo = ref(false);


const handleClick = (e: PointerEvent) => {
  if (e.shiftKey) {
    $showInfo.value = !$showInfo.value;
  } else {
    if (store.focus === 'key' && store.keyIds[0] === props.symbol.id) {
      store.setFocus('none');
    } else {
      store.setFocus('key', props.symbol);
    }
  }
}

const btnClass = [
  'ex-hg-button',
  'hg-functionBtn',
  'btn-id-' + $id,
  'btn-name-' + name,
]

</script>

<template>
  <div ref="el"
      @click.prevent.stop="handleClick"
      :data-skbtn="$id"
      :data-skbtnuid="$dataKeyId"
      :class="[ btnClass, { 'highlight-btn': $isActive } ]">
    <span>{{ $cap }}</span>
    <KeyInfo :sym="props.symbol" :show="$showInfo" :context="el"></KeyInfo>
  </div>
</template>

<style>
.ex-hg-button {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  margin: 0;
  padding: 0;
  border-bottom: 1/70% solid var(--key-border-color);
  border-radius: calc(0.4cqw);

  text-wrap: nowrap;
  font-size: 0.85cqw;

  background-color: var(--default-key-color);
  transition: background-color 0.1s ease-out;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 0 3px -1px rgba(0,0,0,.3); /*, var(--key-border-color) 0 3px;*/
  box-sizing: border-box;
  cursor: pointer;


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