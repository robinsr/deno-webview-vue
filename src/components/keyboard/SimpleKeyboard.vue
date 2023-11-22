<script setup lang="ts">
import { ref, provide, inject, computed, toValue } from 'vue';
import { injectApps, injectFocus } from '../../providers/inject.ts';
import { KeySym } from '@keys/key-types.ts';
import { getSymbolForKey } from '@keys/symbol.ts';
import { HotKey, HotKeyGroup } from '../../shortcuts/ShortcutApp.ts';
import { FocusState, KeyPress } from './types.ts'

import Keyboard  from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import UICard from '../ui/components/UICard.vue';
import UIColumns from '../ui/components/UIColumns.vue';
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
const $focusState = ref<FocusState>({ focus: 'none' });

provide(injectFocus, $focusState);

const setFocus = (s: 'hotkey' | 'key' | 'none', data?: HotKey | KeySym): void => {
  let newState: FocusState = { focus: 'none' };

  if (s === 'hotkey') {
    newState = { focus: 'hotkey', hotkey: data as HotKey };
  }

  if (s === 'key') {
    newState = { focus: 'key', key: data as KeySym };
  }

  $focusState.value = newState;
}

const $keys = computed((): KeySym[] => {
  if ($focusState.value.focus == 'hotkey') {
    return $focusState.value.hotkey.symbols;
  }

  if ($focusState.value.focus == 'key') {
    return [ $focusState.value.key ];
  }

  return $highlighted.value ? $highlighted.value.symbols : [];
});

const onShortcutHover = (hovered: HotKey) => {
  switch ($focusState.value.focus) {
    case 'none':
      return $highlighted.value = hovered;
    default:
      return;
  }
}

const onShortcutClick = (clicked: HotKey) => {
  $inspect.value = clicked;

  switch ($focusState.value.focus) {
    case 'none':
      return setFocus('hotkey', clicked);
    case 'hotkey':
      if ($focusState.value.hotkey.id === clicked.id) {
        return setFocus('none');
      }
    default:
      return setFocus('hotkey', clicked);
  }
}

const onKeyPress = ({ button, ...props }: KeyPress) => {
  console.log(`SimpleKeyboard#onKeyPress`, button, props);
  $inspect.value = { button, ...props };

  switch ($focusState.value.focus) {
    case 'key':
      if ($focusState.value.key.id === button) {
        return setFocus('none');
      }
    default:
      setFocus('key', getSymbolForKey(button));
  }
}

const clearSelected = () => {
  setFocus('none');
}

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
                  @item-hovered="onShortcutHover"
                  @item-clicked="onShortcutClick"
                  :debug="$debug" />
      </UIColumns>
    </div>
    <Keyboard @onKeyPress="onKeyPress" />
    <KeyDebug v-if="$debug" :keys="$keys" :clicked="$focusState" :inspect="$inspect"/>
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
