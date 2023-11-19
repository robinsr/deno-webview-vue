<script setup lang="ts">
import { ref, computed, inject, toValue } from 'vue';
import { injectFocus } from '../../providers/inject.ts';
import { HotKey } from '../../shortcuts/ShortcutApp.ts';
import { FocusState } from './types.ts';
import "core-js/actual"

import KBD from './KBD.vue';

const props = defineProps<{
  hotkey: HotKey;
}>();

const keyIds = new Set(props.hotkey.symbols.map(k => k.id));

const keyfocus = inject(injectFocus, ref<FocusState>({ focus: 'none' }));

const $isActive = computed((): boolean => {
  const { focus } = keyfocus.value;

  switch(focus) {
    case 'hotkey':
      return keyfocus.value.hotkey.id === props.hotkey.id;
    case 'key':
      return keyIds.has(keyfocus.value.key.id);
    case 'none':
    default:
      return false;
  }
});

</script>

<template>
  <li class="shortcut-item" :class="[{ 'highlight': $isActive }]">
    <span class="shortcut-item-label">{{ hotkey.label }}</span>
    <KBD :symbols="hotkey.symbols" />
  </li>
</template>

<style scoped>
.shortcut-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.4em;
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