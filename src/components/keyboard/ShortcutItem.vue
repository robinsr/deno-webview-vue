<script setup lang="ts">
import { HotKey } from '../../shortcuts/ShortcutApp.ts';
import { useStore } from '@/store/app-store.ts';
import KBD from './KBD.vue';
import { computed, unref } from 'vue';

const store = useStore();

const props = defineProps<{
  hotkey: HotKey;
}>();

const { symbols, id } = unref(props.hotkey);

const keyIds = Array.from(new Set(symbols.map(k => k.id)));

const $hotkeyMatch = computed(() => {
  return store.hotkey && store.hotkey.id === id;
})

const $singleMatch = computed(() => {
  return !store.hotkey && keyIds.includes(store.keyIds[0] || '');
});

const handleClick = () => {
  if (store.hotkey && store.hotkey.id === id) {
    store.setFocus('none');
  } else {
    store.setFocus('hotkey', props.hotkey);
  }
}

</script>

<template>
  <li class="shortcut-item"
      :class="[{ 'highlight': $hotkeyMatch || $singleMatch }]"
      @click.stop="handleClick">

    <span class="shortcut-item-label">
      {{ hotkey.label }}
    </span>

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