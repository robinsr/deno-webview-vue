<script setup lang="ts">
import { ref, computed, unref } from 'vue';
import { useDataStore } from '@/store/data-store.ts';
import { useViewStore, type KBFocusTarget } from '@/store/view-store.ts';
import { KeySym } from '@keys/key-types.ts';
import { HotKey } from '@/shortcuts/ShortcutApp.ts';

import Keyboard  from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import UIColumns from '@ui/UIColumns.vue';
import ListCard from './ListCard.vue';

const viewStore = useViewStore();
const dataStore = useDataStore();

const $selectedApp = computed(() => dataStore.selectedApp);
const $focusTarget = computed(() => viewStore.focus as KBFocusTarget);
const $focusState = computed(() => viewStore.focusState);


const $highlighted = ref<HotKey>();
const $columns = ref<number>(3);
const $inspect = ref<object>();

const $keys = computed((): KeySym[] => {
  if ($focusTarget !== 'none') {
    return viewStore.keys;
  }

  return $highlighted.value ? $highlighted.value.symbols : [];
});

const onShortcutHover = (hovered: HotKey) => {
  if ($focusTarget === 'none') {
    $highlighted.value = hovered;
  }
}


</script>

<template>
  <div class="shortcut-viewer" v-if="$selectedApp">
    <h1>Hotkeys for {{ $selectedApp.name }}</h1>
    <div class="shortcut-viewer-list">
      <UIColumns :count="$columns" v-if="$selectedApp" class="shortcut-list">
        <ListCard v-for="($group, $gi) in $selectedApp.groupings"
                  :key="$selectedApp.name+$gi"
                  :title="$group.name"
                  :items="$group.items"
                  @item-hovered="onShortcutHover" />
      </UIColumns>
    </div>
    <Keyboard />
    <KeyDebug
        :keys="$keys"
        :clicked="$focusState"
        :inspect="$inspect" />
  </div>
</template>


<style scoped lang="css">
.shortcut-viewer {
  .shortcut-list {
  }
}
</style>
