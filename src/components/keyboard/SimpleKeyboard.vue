<script setup lang="ts">
import { ref, computed, unref } from 'vue';
import { useDataStore } from '@/store/data-store.ts';
import { useViewStore, type KBFocusTarget } from '@/store/view-store.ts';
import { KeySym } from '@keys/key-types.ts';
import { HotKey } from '@/shortcuts/ShortcutApp.ts';

import Keyboard  from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import UIColumns from '@ui/UIColumns.vue';
import ListCard from '../shortcuts/ListCard.vue';

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
    <header>
      <h1>Hotkeys for {{ $selectedApp.name }}</h1>
    </header>
    <section class="shortcut-viewer-list">
      <UIColumns :count="$columns" v-if="$selectedApp" class="shortcut-list">
        <ListCard v-for="($group, $gi) in $selectedApp.groupings"
                  :key="$selectedApp.name+$gi"
                  :title="$group.name"
                  :items="$group.items"
                  @item-hovered="onShortcutHover" />
      </UIColumns>
    </section>
    <section class="keyboard">
      <Keyboard />
    </section>
  </div>

  <div class="shortcut-viewer" v-else>
    <header>
      <p>No app loaded</p>
      <p>Go to <code>File</code> → <code>New</code></p>
    </header>
  </div>
</template>


<style scoped>
.shortcut-viewer {
  box-sizing: border-box;
  height: 100%;
  max-height: calc(100vh - 36px);
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: space-between;

  overflow: hidden;

  & header {
    flex: 0 2 10vh;
  }

  & .shortcut-viewer-list {
    flex: 1 1 60vh;
  }

  & .keyboard {
    flex: 0 0 30vh;
  }

  & header h1 {
    margin: 0.2em 0;
    font-size: 1.4em;
  }

  & .shortcut-viewer-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    margin-bottom: 1.5em;
    overflow-y: scroll;

    .keep-this {
      overflow-x: hidden;
    }

    .keep-this:before {
      content: "";
      position: absolute;
      left: -100px;
      right: 0;
      width: 120%;
      height: 100%;
      box-shadow: rgb(255, 240, 0) 0px 10px 20px 0px inset;
      margin: 0 auto;
    }

    & .shortcut-list {
      width: 98%;
    }
  }
}
</style>
