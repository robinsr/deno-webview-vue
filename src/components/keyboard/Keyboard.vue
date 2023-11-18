<script setup lang="ts">
import "core-js/actual";
import { ref } from 'vue';
import "simple-keyboard/build/css/index.css";
import Keyboards from '@keys/keyboard-config.ts';
import { KeySym, KeyboardSpec } from '@keys/key-types.ts'
import KeyboardKey from './KeyboardKey.vue';
import { KeyPress } from './types.ts';


const keys: KeyboardSpec = Keyboards['apple_MB110LL'];
const $mainKeyboard = ref<KeySym[][]>(keys.sections.main.rows);

const props = withDefaults(defineProps<{
  keys: KeySym[]
}>(), {
  keys: []
});

const emit = defineEmits<{
  (e: 'onKeyPress', key: KeyPress): void;
}>();
</script>

<template>
    <main class="keyboardContainer">

        <div class="simple-keyboard-main">
          <div class="simple-keyboard simple-keyboard-main hg-theme-default hg-layout-default vue-shortcuts" data-skinstance="simpleKeyboardMain">
            <div class="hg-rows">
              <div class="hg-row" v-for="($row, $rowNum) in $mainKeyboard">
                  <KeyboardKey v-for="($key, $keyNum) in $row"
                               @key-clicked="b => $emit('onKeyPress', b)"
                               :symbol="$key"
                               :row-num="$rowNum+1"
                               :button-num="$keyNum+1"/>
              </div>
            </div>
          </div>
        </div>

        <div class="controlArrows">
            <div class="simple-keyboard-control"></div>
            <div class="simple-keyboard-arrows"></div>
        </div>

        <div class="numPad">
            <div class="simple-keyboard-numpad"></div>
            <div class="simple-keyboard-numpadEnd"></div>
        </div>
    </main>
</template>

<style>
input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.keyboardContainer {
  --std-key-height: 60px;
  --sm-key-height: 45px;
  --default-key-color: rgba(255, 255, 255, 1.0);
  --mod-key-color: rgba(180, 180, 180, 1.0);
  --std-key-hl-color: rgba(129, 86, 201, 1.0);
  --mod-key1-hl-color: rgba(54, 187, 153, 1.0);
  --mod-key2-hl-color: rgba(245, 159, 0, 1.0);
  --mod-key3-hl-color: rgba(240, 62, 62, 1.0);
  --key-text-color: rgba(0, 0, 0, 1);
  --container-bg-color: rgba(0, 0, 0, 0.1);

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
      transition: background-color 0.1s ease-out;

      &[class*="hg-button-{meta}"],
      &[class*="hg-button-{shift}"],
      &[class*="hg-button-{ctrl}"],
      &[class*="hg-button-{alt}"] {
        background-color: var(--mod-key-color);
        border-bottom-color: color-mix(in srgb, var(--mod-key-color) 50%, #000000 75%);
      }

      &.highlight-btn {

        background-color: color-mix(in srgb, var(--std-key-hl-color) 75%, var(--default-key-color));
        border-bottom-color: color-mix(in srgb, var(--std-key-hl-color) 50%, #000000 50%);

        &[class*="hg-button-{meta}"] {
          background-color: color-mix(in srgb, var(--mod-key1-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key1-hl-color) 50%, #000000 50%);
        }

        &[class*="hg-button-{shift}"] {
          background-color: color-mix(in srgb, var(--mod-key2-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key2-hl-color) 50%, #000000 50%);
        }

        &[class*="hg-button-{ctrl}"] {
          background-color: color-mix(in srgb, var(--mod-key3-hl-color) 75%, var(--default-key-color));
          border-bottom-color: color-mix(in srgb, var(--mod-key3-hl-color) 50%, #000000 50%);
        }

        &[class*="hg-button-{alt}"] {
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