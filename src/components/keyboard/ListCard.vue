<script setup lang="ts">
import { HotKey } from '../../keys/key-types.ts';
import { KeySym } from '../../keys/keyboard-symbol.ts';

import ShortcutItem from './ShortcutItem.vue';

withDefaults(defineProps<{
  title: string;
  items: HotKey[];
  keyFocus: KeySym;
}>(), {
  keyFocus: null
})

const emit = defineEmits<{
  (e: 'itemHovered', item: HotKey): void;
  (e: 'itemLeft', item: HotKey): void;
  (e: 'itemClicked', item: HotKey): void;
}>();
</script>

<template>
  <x-card class="shortcut-group">
    <main>
      <strong>{{ title }}</strong>
      <ul>
        <ShortcutItem
            v-for="item in items"
            :hotkey="item"
            :key-focus="keyFocus"
            @mouseenter="$emit('itemHovered', item)"
            @mouseleave="$emit('itemLeft', item)"
            @click="$emit('itemClicked', item)"
        />
      </ul>
    </main>
  </x-card>
</template>

<style scoped>
.shortcut-group {
  break-inside: avoid-column;
  padding: 0;
  margin: 0 10px 15px 10px
}
</style>