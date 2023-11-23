<script setup lang="ts">
import { ref, computed, unref } from 'vue';
import { KBFocusState } from '@/store/types.ts'
import { useStore } from '@/store/app-store.ts';
import { KeySym } from '@keys/key-types.ts';
import { HotKey } from '@/shortcuts/ShortcutApp.ts';

import Keyboard  from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import UIColumns from '@ui/UIColumns.vue';
import ListCard from './ListCard.vue';
import KeyboardControls from './KeyboardControls.vue';

const store = useStore();

const $selectedApp = computed(() => store.data.selectedApp);
const $focusState = computed(() => store.data.focusState as KBFocusState);


const $highlighted = ref<HotKey>();
const $columns = ref<number>(3);
const $inspect = ref<object>();

const $keys = computed((): KeySym[] => {
  if (store.focus !== 'none') {
    return store.keys;
  }

  return $highlighted.value ? $highlighted.value.symbols : [];
});

const onShortcutHover = (hovered: HotKey) => {
  if (store.focus === 'none') {
    $highlighted.value = hovered;
  }
}


</script>

<template>
  <div class="shortcut-viewer">
    <div class="shortcut-viewer-controls">
      <KeyboardControls />
    </div>
    <div class="shortcut-viewer-list">
      <UIColumns :count="$columns" v-if="$selectedApp" class="shortcut-list">
        <ListCard v-for="($group, $gi) in $selectedApp.groupings"
                  :key="$selectedApp.name+$gi"
                  :title="$selectedApp.name + ' - ' + $group.name as string"
                  :items="$group.items"
                  @item-hovered="onShortcutHover" />
      </UIColumns>
    </div>
    <Keyboard />
    <KeyDebug :keys="$keys" :clicked="$focusState" :inspect="$inspect"/>
  </div>
</template>


<style scoped lang="css">
.shortcut-viewer {
  .shortcut-list {
  }
}
</style>
