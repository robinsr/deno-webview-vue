<script setup lang="ts">
import { ref, provide, inject, computed, toValue } from 'vue';
import { injectApps, injectFocus } from '../../providers/inject.ts';
import { KeySym } from '@keys/key-types.ts';
import { getSymbolForKey } from '@keys/symbol.ts';
import { HotKey, HotKeyGroup } from '../../shortcuts/ShortcutApp.ts';
import { FocusState, KeyPress } from './types.ts'

import Keyboard  from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import UICard from '../layout/UICard.vue';
import UIColumns from '../layout/UIColumns.vue';
import ListCard from './ListCard.vue';

const apps = inject(injectApps, {});
const appNames = Object.keys(apps)
const appConfigs = Object.values(apps);
const $apps = ref<HotKeyGroup[]>(appConfigs);
const $selectedApp = ref<HotKeyGroup>(appConfigs[0]);

const $columns = ref<number>(3);
const $inspect = ref<object>();
const $debug = ref<boolean>(true);


const handleAppSelect = (e) => {
  $selectedApp.value = $apps.value.find(a => a.name === e.target.value);
}


const $highlighted = ref<HotKey>();
const $clicked = ref<FocusState>({ focus: 'none' });

const $keys = computed((): KeySym[] => {
  if ($clicked.value.focus == 'hotkey') {
    return $clicked.value.hotkey.symbols;
  }

  if ($clicked.value.focus == 'key') {
    return [ $clicked.value.key ];
  }

  return $highlighted.value ? $highlighted.value.symbols : [];
});

const onShortcutHover = (hovered: HotKey) => {
  if ($clicked.value) {
    return;
  }

  $highlighted.value = hovered;
}

const onShortcutClick = (clicked: HotKey) => {
  $inspect.value = clicked;

  const { focus, hotkey } = toValue($clicked);

  if (!$clicked.value || $clicked.value.focus === 'none') {
    $clicked.value = { focus: 'hotkey', hotkey: clicked }
  }

  if (focus === 'hotkey' && hotkey.id === clicked.id) {
    $clicked.value = { focus: 'none' };
  }

  $clicked.value = { focus: 'hotkey', hotkey: clicked }
}

const onKeyPress = ({ button, ...props }: KeyPress) => {
  $inspect.value = { button, ...props };

  const clickedSym = getSymbolForKey(button);

  const { focus, key, hotkey } = toValue($clicked);

  if (focus && focus === 'key' && key.id === clickedSym.id) {
    $clicked.value = { focus: 'none' };
    return;
  }

  $clicked.value = { focus: 'key', key: clickedSym }
}

const clearSelected = () => {
  $clicked.value = { focus: 'none' };
}

provide(injectFocus, $clicked);

</script>

<template>
  <div class="shortcut-viewer">
    <div class="shortcut-viewer-controls">
      <UIColumns :count="3">
        <UICard title="Select Group">
          <x-label v-if="$selectedApp">Selected: {{ $selectedApp.name }}</x-label>
          <x-select :value="$selectedApp.name">
            <x-menu>
              <x-label>Select an app:</x-label>
              <x-menuitem v-for="app in $apps"
                          :value="app.name"
                          :toggled="app.name === $selectedApp.name"
                          @click="handleAppSelect">
                <x-label>{{app.name}}</x-label>
              </x-menuitem>
            </x-menu>
          </x-select>
        </UICard>
        <UICard>
          <x-button @click="clearSelected">
            <x-label>Clear</x-label>
          </x-button>
        </UICard>
        <UICard title="Debug">
          <x-switch :toggled="$debug" @click="$debug = !$debug">
            <x-label>Debug</x-label>
          </x-switch>
        </UICard>
      </UIColumns>
      <UIColumns :count="$columns" v-if="$selectedApp" class="shortcut-list">
        <ListCard v-for="($group, $gi) in $selectedApp.groupings"
                  :key="$selectedApp.name+$gi"
                  :title="$selectedApp.name + ' - ' + $group.name as string"
                  :items="$group.items"
                  :key-focus="$clicked"
                  @item-hovered="onShortcutHover"
                  @item-clicked="onShortcutClick"
                  :debug="$debug" />
      </UIColumns>
    </div>
    <Keyboard :keys="$keys" @onKeyPress="onKeyPress" />
    <KeyDebug v-if="$debug" :keys="$keys" :clicked="$clicked" :inspect="$inspect"/>
  </div>
</template>


<style scoped lang="css">
.shortcut-viewer {

  .shortcut-viewer-controls {
    margin-bottom: 15px;

    .shortcut-list {

    }
  }
}
</style>
