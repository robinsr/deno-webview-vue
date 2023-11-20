<script setup lang="ts">
import { HotKey } from '../../shortcuts/ShortcutApp.ts';

import UICard from '../layout/UICard.vue';
import ShortcutItem from './ShortcutItem.vue';

withDefaults(defineProps<{
  title: string;
  items: HotKey[];
}>(), {
  title: '',
  items: []
})

const emit = defineEmits<{
  (e: 'itemHovered', item: HotKey): void;
  (e: 'itemLeft', item: HotKey): void;
  (e: 'itemClicked', item: HotKey): void;
}>();
</script>

<template>
  <UICard :title="title" class="shortcut-group">
    <ul class="shortcut-list">
      <ShortcutItem
          v-for="item in items"
          :hotkey="item"
          @mouseenter="$emit('itemHovered', item)"
          @mouseleave="$emit('itemLeft', item)"
          @click="$emit('itemClicked', item)"
      />
    </ul>
  </UICard>
</template>

<style scoped>
.shortcut-group {
  break-inside: avoid-column;
  padding: 0;
  margin: 0 10px 15px 10px;

  .shortcut-list > *:nth-child(odd) {
    backdrop-filter: brightness(80%);
  }
}
</style>