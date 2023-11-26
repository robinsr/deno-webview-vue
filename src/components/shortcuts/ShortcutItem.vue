<script setup lang="ts">
import { computed, unref } from 'vue';
import { HotKey } from '../../shortcuts/ShortcutApp.ts';
import { useViewStore } from '@/store/view-store.ts';
import KBD from '@/components/ui/KBD.vue';

const viewStore = useViewStore();

const props = defineProps<{
  hotkey: HotKey;
}>();

const { symbols, id } = unref<HotKey>(props.hotkey);

const keyIds = Array.from(new Set(symbols.map(k => k.id)));

const $hotkeyMatch = computed(() => {
  return viewStore.hotkey && viewStore.hotkey.id === id;
})

const $singleMatch = computed(() => {
  return !viewStore.hotkey && keyIds.includes(viewStore.keyIds[0] || '');
});

const handleClick = () => {
  if (viewStore.hotkey && viewStore.hotkey.id === id) {
    viewStore.setFocus('none');
  } else {
    viewStore.setFocus('hotkey', props.hotkey);
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
  --hover-bg-color: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.4em;
  border-radius: 0.2em;
  padding: 0 0.2em;
  cursor: pointer;

  &:hover {
    background-color: color-mix(in srgb, var(--fuchsia-blue) 50%, var(--background-color));
  }

  &.highlight {
    background-color: color-mix(in srgb, var(--fuchsia-blue) 75%, var(--background-color));
  }
}
</style>