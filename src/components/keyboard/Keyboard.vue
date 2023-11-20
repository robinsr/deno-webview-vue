<script setup lang="ts">
import { ref, inject, useCssModule } from 'vue';
import "simple-keyboard/build/css/index.css";
import Keyboards from '@keys/keyboard-config.ts';
import type { KeySym, KeyboardSpec, SectionLayout, KeyboardRow } from '@keys/key-types.ts'
import KeyboardKey from './KeyboardKey.vue';
import type { KeyPress } from './types.ts';

useCssModule('colors');

const $app = inject('app-id');

const $currentKB = ref<KeyboardSpec>(Keyboards['apple_MB110LL']);

const props = withDefaults(defineProps<{}>(), {});

const emit = defineEmits<{
  (e: 'onKeyPress', key: KeyPress): void;
}>();

const COL_GAP = 0;
const GRID_GAP = 7;

const gridContainer = () => {
  const { rows: rowConfig, cols: colConfig } = $currentKB.value.grid;

  const rows = Object.values($currentKB.value.sections)
      .map(section => section.rows);

  const numCols = Math.max(...Object.values($currentKB.value.sections)
      .map(section => section.position.col));

  const emptyArr = Array.from({ length: numCols }, () => [] as KeyboardRow[]);
  const joinedCols = Object.values($currentKB.value.sections)
      .reduce((acc, section) => {
        acc[section.position.col - 1].push(...section.rows);
        return acc;
      }, emptyArr);

  console.log(joinedCols);

  const colLengths = joinedCols.map(rows => longestRow(rows))
  const totalLength = colLengths.reduce((t, x) => t + x, 0);
  const gridHeight = tallest(rows);

  const colTemplate = colLengths
      .map(l => `${Math.floor((l*100) / totalLength)}fr`)
      .join(' ');

  return {
    'display': 'grid',
    'grid-template-columns': colTemplate,
    'grid-template-rows': `repeat(${rowConfig}, 1fr)`,
    'grid-row-gap': `${GRID_GAP}px`,
    'grid-column-gap': `${GRID_GAP * 4}px`,
    'aspect-ratio': `${totalLength}/${gridHeight}`
  }
}

const gridSection = (kb: SectionLayout) => {
  const grid = $currentKB.value.grid?.rows || 6;

  const { row, col } = kb.position || { row: 1, col: 1 };

  return {
    'aspect-ratio': `${longestRow(kb.rows)}/${heightMax(kb.rows)}`,
    'grid-column-start': col,
    'grid-column-end': col + 1,
    'grid-row-start': row,
    'grid-row-end': row + kb.rows.length,
    'grid-gap': `${GRID_GAP}px`
  }
}

const sectionRows = (kb: SectionLayout) => {
  const rows = kb.rows;

  return {
    'display': 'grid',
    'height': '100%',
    'grid-template-columns': '100%',
    'grid-template-rows': `repeat(${rows.length}, 1fr)`,
    'grid-gap': `${GRID_GAP}px`//'min(2%, 6px)'
  }
}

const sectionCols = (kb: SectionLayout, rowIndex: number) => {
  let columns;
  if (kb.grid) {
    columns = `repeat(${kb.grid.cols}, 1fr)`;
  } else {
    columns = `repeat(${rowTotal(kb.rows, rowIndex)}, 1fr)`;
  }

  return {
    'display': 'grid',
    'grid-template-columns': columns,
    'grid-gap': `${GRID_GAP}px`
  }
}

// todo - determine programmatically
const KEY_HEIGHT = 7;

const tallest = (rows: KeyboardRow[][]): number => {
  return Math.max(...rows.map(row => heightMax(row)));
}

const heightMax = (rows: KeyboardRow[]): number => {
  return rows.length * KEY_HEIGHT;
}

const rowTotal = (rows: KeyboardRow[], rowIndex: number): number => {
  return rows[rowIndex].reduce((off, k) => off + k.width + COL_GAP, 0);
}

const longestRow = (rows: KeyboardRow[]): number => {
  return Math.max(...rows.map((_r, i) => rowTotal(rows, i)));
}

const keyOffset = (rows: KeyboardRow[], rowIndex: number, keyIndex: number, key: KeySym): number => {
  if (!key || !key.id) {
    console.warn(`No key ${key}, row: ${rowIndex}`);
    return 0;
  }

  if (rows.at(rowIndex)) {
    let r = rows.at(rowIndex)!;
    return r.slice(0, keyIndex).reduce((off, k) => off + k.width + (k.offset || 0) + COL_GAP, 0);
  }

  return 0;
}

const sectionClass = (kb: SectionLayout) => {
  return [
    'kb-section',
    `kb-section-${kb.name}`,
    'hg-theme-default',
    'vue-shortcuts',
    'grid-layout',
  ]
}

</script>

<template>
    <main class="kb-container" :style="gridContainer()">
      <template v-for="$kb in $currentKB.sections">
        <div :class="sectionClass($kb)" :style="gridSection($kb)">
          <div class="hg-rows" :style="sectionRows($kb)">
            <div class="hg-row" v-for="($row, $rowNum) in $kb.rows" :style="sectionCols($kb, $rowNum)">
                <KeyboardKey v-for="($key, $keyNum) in $row"
                             @key-clicked="b => $emit('onKeyPress', b)"
                             :grid-left="keyOffset($kb.rows, $rowNum, $keyNum, $key)"
                             :symbol="$key"
                             :row-num="$rowNum+1"
                             :button-num="$keyNum+1"/>
            </div>
          </div>
        </div>
      </template>
    </main>
</template>

<style module="colors">
:global(:root)  {
  --std-key-height: 100%;
  --sm-key-height: 75%;
  --default-key-color: rgba(255, 255, 255, 1.0);
  --mod-key-color: rgba(180, 180, 180, 1.0);
  --std-key-hl-color: rgba(129, 86, 201, 1.0);
  --mod-key1-hl-color: rgba(54, 187, 153, 1.0);
  --mod-key2-hl-color: rgba(245, 159, 0, 1.0);
  --mod-key3-hl-color: rgba(240, 62, 62, 1.0);
  --key-text-color: rgba(0, 0, 0, 1.0);
  --key-border-color: color-mix(in srgb, var(--default-key-color) 100%, var(--key-text-color) 50%);
  --container-bg-color-dark: rgba(0, 0, 0, 0.1);
  --container-bg-color-light: rgb(255 255 255 / 69%);
  --kb-font: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
}
</style>

<style scoped>
input {
  border: none;

}

.kb-container {
  container-type: inline-size;
  container-name: kb-container;
  width: 100%;
  max-width: 1600px;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 12px;

  border-radius: 5px;

  background-color: var(--container-bg-color-light);
  color: var(--key-text-color);

  .kb-section.vue-shortcuts {
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 0;
    overflow: hidden;

    background: none;
    font-family: var(--kb-font);

    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    .hg-row {
      display: grid;
      margin: 0;
    }
  }

  .vue-shortcuts.grid-layout {
    .kb-section {
      margin: 0 auto;
      padding: 0;
    }
  }
}
</style>
