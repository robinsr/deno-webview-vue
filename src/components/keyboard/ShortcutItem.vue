<script setup lang="ts">
import { computed, toValue } from 'vue';
import { HotKey } from '@keys/key-types.ts';
import { FocusState } from './types.ts';
import "core-js/actual"

import KBD from './KBD.vue';

const props = withDefaults(defineProps<{
  hotkey: HotKey;
  keyFocus: FocusState;
}>(), {
  keyFocus: { focus: 'none' }
});

const keyIds = new Set(props.hotkey.symbols.map(k => k.id));

const isHL = computed((): boolean => {
  const { focus, hotkey, key } = toValue(props.keyFocus);

  if (!focus || focus === 'none') {
    return false;
  }

  if (focus === 'hotkey') {
    return hotkey.id === props.hotkey.id;
  }

  if (focus === 'key') {
    return keyIds.has(key.id);
  }

  return false;
});

</script>

<template>
  <li class="shortcut-item" :class="{ 'highlight': isHL }">
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
    background-color: var(--fuchsia-blue);
  }

  &.highlight {
    background-color: var(--fuchsia-blue);
  }
}
</style>