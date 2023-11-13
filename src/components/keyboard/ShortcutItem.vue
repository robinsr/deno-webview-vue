<script setup lang="ts">
import { ref, isProxy, toRaw, toValue, isRef, unref } from 'vue';
import { HotKey } from '../../keys/key-types.ts';
import { KeySym } from '../../keys/keyboard-symbol.ts';

import KBD from './KBD.vue';

const props = withDefaults(defineProps<{
  hotkey: HotKey;
  keyFocus: KeySym;
}>(), {
  keyFocus: null
});
</script>

<template>
  <li class="shortcut-item" :class="{ 'hover': false }">
    <span class="shortcut-item-label">{{ hotkey.label }}</span>
    <KBD :symbols="hotkey.symbols" />
  </li>
</template>

<style scoped>
.shortcut-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0.8em;
  border-radius: 0.2em;
  padding: 0 0.2em;
  cursor: pointer;

  &:hover {
    background-color: var(--std-key-hl-color);
  }

  &.hover {
    background-color: var(--std-key-hl-color);
  }
}
</style>