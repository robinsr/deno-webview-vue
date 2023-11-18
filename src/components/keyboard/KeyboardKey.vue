<script setup lang="ts">
import { computed, inject, ref, unref } from 'vue';
import { injectFocus } from '../../providers/inject.ts';
import { KeySym } from '@keys/key-types.ts';
import { KeyPress } from './types.ts';

const emit = defineEmits<{
  (e: 'keyClicked', item: KeyPress): void;
}>();

const props = defineProps<{
  symbol: KeySym;
  rowNum: number;
  buttonNum: number;
}>();

const el = ref(null);

const { id, legend, sizes } = unref(props.symbol)
console.log(id, legend, sizes)

const $id = ref(props.symbol.id);
const $cap = ref(props.symbol.legend.cap);
const $width = ref(props.symbol.sizes.default.width);

const profile = 'default';
const $keyId = ref(`${profile}-r${props.rowNum}b${props.buttonNum}`);

const $keyfocus = inject(injectFocus);

const $isActive = computed(() => {
  const { focus, hotkey, key } = $keyfocus.value;

  if (focus === 'hotkey') {
    return hotkey.symbols
        .map(sym => sym.id).includes(props.symbol.id);
  }

  if (focus === 'key') {
    return key === props.symbol.id;
  }
});

const handleClick = (event: PointerEvent) => {
  emit('keyClicked', { button: props.symbol.id });
}


</script>

<template>
  <div ref="el"
      @click="handleClick"
      :data-skbtn="$id"
      :data-skbtnuid="$keyId"
      :class="[
          'hg-button',
          'hg-functionBtn',
          'hg-button-' + $id,
          { 'highlight-btn': $isActive}
      ]"
       :style="{
        'flex-grow': $width
       }"
  >
    <span>{{ $cap }}</span>
  </div>
</template>

<style scoped>

</style>