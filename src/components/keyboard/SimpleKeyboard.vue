<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue';
import { debounce } from 'lodash';
import { HotKey, HotKeyGroup, ShortcutGroup } from '../../keys/key-types.ts';
import { mapKeySymbols, getSymbolForKey } from '../../keys/symbol.ts';
import GithubDesktop from '../../shortcuts/github-desktop.shortcuts.ts';
import SublimeHotkeys from '../../shortcuts/sublime.hotkeys.ts';
import TestApp from '../../shortcuts/test-app.shortcuts.ts';

import Keyboard, { KeyPress } from './Keyboard.vue';
import KeyDebug from './KeyDebug.vue';
import Columns from '../layout/Columns.vue';
import ListCard from './ListCard.vue';
import KeyboardSymbol, { KeySym } from '../../keys/keyboard-symbol.ts';

const $columns = ref<number>(3);
const $clicked = ref<string>();
const $inspect = ref<object>();
const $debug = ref<boolean>(true);

const mapApp = ({ name, groups }: ShortcutGroup): HotKeyGroup => ({
    name, groups: Object.entries(groups)
      .map(([ name, items ]) => ({
          name, items: items.map(i => ({ ...i, symbols: mapKeySymbols(i.keys) }))
      }))
      .reduce((acc, { name, items}) => ({ ...acc, [name]: items }), {})
  });

console.log(mapApp(TestApp))

const $apps = ref<HotKeyGroup[]>([
  mapApp(TestApp), mapApp(GithubDesktop), mapApp(SublimeHotkeys)
]);

const $selectedApp = ref<HotKeyGroup | null>($apps.value[0]);

const handleAppSelect = (e) => {
  $selectedApp.value = $apps.value.find(a => a.name === e.target.value);
}

/*
Highlight keys when shortcut is hovered
*/
const $highlighted = ref<HotKey>();
const $previousKeys = ref<string[]>([]);

const $keys = computed((): KeySym[] => {
  if ($clicked.value) {
    return [ getSymbolForKey($clicked.value) ]
  }
  return $highlighted.value ? $highlighted.value.symbols : [];
})

const onShortcutHover = (hovered: HotKey) => {
  $highlighted.value = hovered;
}

const onShortcutClick = (clicked: HotKey) => {
  $inspect.value = clicked;
}

const onKeyPress = ({ button, ...props }: KeyPress) => {
  $clicked.value = button;
  $inspect.value = { button, ...props };
}

const clearHover = (hovered: HotKey) => {
  $previousKeys.value.push(...hovered.symbols);
}


/*
Create keyboard visualizer
*/
onMounted(() => {

  const clear = debounce(() => {
    //const current = $highlighted.value?.symbols || [];
    //let removeHL = difference(allKeys, current).join(' ');
  }, 100, { maxWait: 1000 });

  watchEffect(() => {
    if ($selectedApp.value && $highlighted.value) {
      // no longer needed
    }
    clear();
  }, { flush: 'post' });

  watchEffect(() => {
    if ($selectedApp.value && $clicked.value) {
      $highlighted.value = null;
    }
  })
})
</script>

<template>
  <div class="shortcut-viewer">
    <div class="shortcut-viewer-controls">
      <x-card>
        <main>
          <Columns count=3>
            <x-box>
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
            </x-box>
            <x-box>
              <x-button>
                <x-label>Clear</x-label>
              </x-button>
            </x-box>
            <x-box>
              <x-switch :toggled="$debug" @click="$debug = !$debug">
                <x-label>Debug</x-label>
              </x-switch>
            </x-box>
          </Columns>
        </main>
      </x-card>

      <Columns :count="$columns" v-if="$selectedApp" class="shortcut-list">
        <ListCard v-for="(group, name, i) in $selectedApp.groups"
                  :title="$selectedApp.name + ' - ' + name as string"
                  :items="group"
                  :key-focus="$clicked"
                  @item-hovered="onShortcutHover"
                  @item-clicked="onShortcutClick"
                  :debug="$debug" />
      </Columns>
    </div>
    <Keyboard :keys="$keys" @onKeyPress="onKeyPress" />
    <KeyDebug v-if="$debug" :inspect="$inspect"/>
  </div>
</template>


<style lang="css">
.shortcut-viewer {
  --std-key-height: 60px;
  --sm-key-height: 45px;
  --default-key-color: rgba(255, 255, 255, 1.0);
  --mod-key-color: rgba(120, 120, 120, 1.0);
  --std-key-hl-color: rgba(129, 86, 201, 1.0);
  --mod-key1-hl-color: rgba(54, 187, 153, 1.0);
  --mod-key2-hl-color: rgba(245, 159, 0, 1.0);
  --mod-key3-hl-color: rgba(240, 62, 62, 1.0);
  --key-text-color: rgba(0, 0, 0, 1);
  --container-bg-color: rgba(0, 0, 0, 0.1);;

  .shortcut-viewer-controls {
    margin-bottom: 15px;

    .shortcut-list {

    }
  }
}

input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.keyboardContainer {
  display: flex;
  background-color: var(--container-bg-color);
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  color: var(--key-text-color);

  .simple-keyboard.vue-shortcuts {
    background: none;

    &.hg-theme-default {
      display: inline-block;

      .hg-button {
        height: var(--std-key-height);

        &.hg-selectedButton {
          background: rgba(5, 25, 70, 0.53);
          color: var(--key-text-color);
        }
      }
    }

    .hg-row:first-child {
      margin-bottom: 10px;

      .hg-button {
        height: var(--sm-key-height);
      }
    }

    &.simple-keyboard-main {
      width: 70%;
      min-width: 640px;
      background: none;

    }

    &.simple-keyboard-arrows {
      align-self: flex-end;
      background: none;

      .hg-row {
        justify-content: center;
      }

      .hg-button {
        width: 50px;
        height: var(--std-key-height);
        flex-grow: 0;
        justify-content: center;
        display: flex;
        align-items: center;
      }
    }


    .hg-button {
      background-color: var(--default-key-color);
      transition: background-color 1.0s ease;

      &[class*="hg-button-meta"],
      &[class*="hg-button-shift"],
      &[class*="hg-button-control"],
      &[class*="hg-button-alt"] {
        background-color: var(--mod-key-color);
        border-bottom-color: color-mix(in srgb, var(--mod-key-color) 50%, #000000 75%);
      }

      &.highlight-btn {

        background-color: color-mix(in srgb, var(--std-key-hl-color) 75%, var(--default-key-color));
        border-bottom-color: color-mix(in srgb, var(--std-key-hl-color) 50%, #000000 50%);
        transition: background-color 1.0s ease;

        &[class*="hg-button-meta"] {
          background-color: color-mix(in srgb, var(--mod-key1-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key1-hl-color) 50%, #000000 50%);
          transition: background-color 1.0s ease;
        }

        &[class*="hg-button-shift"] {
          background-color: color-mix(in srgb, var(--mod-key2-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key2-hl-color) 50%, #000000 50%);
        }

        &[class*="hg-button-control"] {
          background-color: color-mix(in srgb, var(--mod-key3-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key3-hl-color) 50%, #000000 50%);
        }

        &[class*="hg-button-alt"] {
          background-color: color-mix(in srgb, var(--mod-key3-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key3-hl-color) 50%, #000000 50%);
        }
      }
    }

    .hg-button.emptySpace {
      pointer-events: none;
      background: none;
      border: none;
      box-shadow: none;
    }

    .hg-button.hg-functionBtn.hg-button-space {
      width: 350px;
    }
  }
}
</style>
