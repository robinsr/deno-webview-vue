<script setup lang="ts">
import { HotKey } from '@keys/key-types.ts';
import { FocusState } from './types.ts';

import UICard from '../layout/UICard.vue';
import ShortcutItem from './ShortcutItem.vue';

withDefaults(defineProps<{
  title: string;
  items: HotKey[];
  keyFocus: FocusState;
}>(), {
  title: '',
  items: [],
  keyFocus: { focus: 'none' }
})

const emit = defineEmits<{
  (e: 'itemHovered', item: HotKey): void;
  (e: 'itemLeft', item: HotKey): void;
  (e: 'itemClicked', item: HotKey): void;
}>();
</script>

<template>
  <UICard :title="title" class="shortcut-group">
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
  </UICard>
</template>

<style scoped>
.shortcut-group {
  break-inside: avoid-column;
  padding: 0;
  margin: 0 10px 15px 10px
}
</style>