<script setup lang="ts">
import "core-js/actual";
import { ref, inject, unref } from 'vue';
import "simple-keyboard/build/css/index.css";
import Keyboards from '@keys/keyboard-config.ts';
import { KeySym, KeyboardSpec } from '@keys/key-types.ts'
import KeyboardKey from './KeyboardKey.vue';
import { KeyPress } from './types.ts';

const $app = inject('app-id');

const keys: KeyboardSpec = Keyboards['apple_MB110LL'];
const rows = keys.sections.main.rows;
const $mainKeyboard = ref<KeySym[][]>(rows);

const props = withDefaults(defineProps<{
  keys: KeySym[]
}>(), {
  keys: []
});

const emit = defineEmits<{
  (e: 'onKeyPress', key: KeyPress): void;
}>();

const $classToggles = ref([
  'simple-keyboard',
  'simple-keyboard-main',
  'hg-theme-default',
  'hg-layout-default',
  'vue-shortcuts',
  //'flex-layout',
  'grid-layout',
]);

const COL_GAP = 0;

const gridLeft = (rowIndex: number, keyIndex: number, key: KeySym): number => {
  if (!key || !key.id) {
    console.warn(`No key ${key}, row: ${rowIndex}`);
    return 0;
  }

  if (rows.at(rowIndex)) {
    let r = rows.at(rowIndex)!;
    return r.slice(0, keyIndex).reduce((off, k) => off + k.width + COL_GAP, 0);
  }

  return 0;
}

const rowTotal = (rowIndex: number): number => {
  return rows[rowIndex].reduce((off, k) => off + k.width + COL_GAP, 0);
}

const gridRows = () => {
  return {
    'display': 'grid',
    'height': '100%',
    'grid-template-columns': '100%',
    'grid-template-rows': `repeat(${rows.length}, 1fr)`,
    'row-gap': 'min(2%, 6px)'
  }
}

const getColumns = (rowIndex: number) => {
  return {
    'display': 'grid',
    'grid-template-columns': `repeat(${rowTotal(rowIndex)}, 1fr)`,
    'grid-column-gap': '4px'
  }
}

const gridMax = (): number => {
  return Math.max(...rows.map((_r, i) => rowTotal(i)));
}

const heightMax = (): number => {
  return rows.length * 7;
}

const aspectRatio = () => {
  return {
    'aspect-ratio': `${gridMax()}/${heightMax()}`
  }
}

</script>

<template>
    <main class="keyboardContainer">
        <div class="simple-keyboard-main">
          <div :class="$classToggles" data-skinstance="simpleKeyboardMain" :style="aspectRatio()">
            <div class="hg-rows" :style="gridRows()">
              <div class="hg-row" v-for="($row, $rowNum) in $mainKeyboard" :style="getColumns($rowNum)">
                  <KeyboardKey v-for="($key, $keyNum) in $row"
                               @key-clicked="b => $emit('onKeyPress', b)"
                               :grid-left="gridLeft($rowNum, $keyNum, $key)"
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
  --std-key-height: 100%;
  --sm-key-height: 75%;
  --default-key-color: rgba(255, 255, 255, 1.0);
  --mod-key-color: rgba(180, 180, 180, 1.0);
  --std-key-hl-color: rgba(129, 86, 201, 1.0);
  --mod-key1-hl-color: rgba(54, 187, 153, 1.0);
  --mod-key2-hl-color: rgba(245, 159, 0, 1.0);
  --mod-key3-hl-color: rgba(240, 62, 62, 1.0);
  --key-text-color: rgba(0, 0, 0, 1);
  --container-bg-color: rgba(0, 0, 0, 0.1);

  /*font-size: 1vb;*/

  //display: flex;
  //justify-content: center;
  background-color: var(--container-bg-color);
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  color: var(--key-text-color);

  .simple-keyboard.vue-shortcuts {
    background: none;
    display: inline-block;

    .hg-row {
      display: grid;
      margin: 0;
      container-type: inline-size;
    }

    .ex-hg-button {
      height: var(--std-key-height);
    }

    .hg-row:first-child {
      /*margin-bottom: 10px;*/

      .ex-hg-button {
        height: var(--sm-key-height);
      }
    }

  }

}
</style>