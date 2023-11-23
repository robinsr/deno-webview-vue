<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import "simple-keyboard/build/css/index.css";
import Keyboards from '@keys/keyboard-config.ts';
import type { KeySym, KeyboardSpec, SectionLayout, KeyboardRow } from '@keys/key-types.ts'
import KeyboardKey from './KeyboardKey.vue';
import { styleMap } from './style-map.ts';

// todo - still needed?
useCssModule('colors');

const $currentKB = ref<KeyboardSpec>(Keyboards['apple_MB110LL']);

const props = withDefaults(defineProps<{}>(), {});

const emit = defineEmits<{
  (e: 'onKeyPress', key: { button: string; }): void;
}>();

const COL_GAP = 0;
const GRID_GAP = 1;
const KEY_GAP = GRID_GAP * 0.3;

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

  const colLengths = joinedCols.map(rows => longestRow(rows))
  const totalLength = colLengths.reduce((t, x) => t + x, 0);
  const gridHeight = tallest(rows);

  const colTemplate = colLengths
      .map(l => `${Math.floor((l*100) / totalLength)}fr`)
      .join(' ');

  return styleMap('gridContainer').all({
    'display': 'grid',
    'grid-template-columns': colTemplate,
    'grid-template-rows': `repeat(${rowConfig}, 1fr)`,
    'grid-row-gap': `${GRID_GAP * 4}%`,
    'grid-column-gap': `${GRID_GAP * 3}%`,
    'aspect-ratio': `${totalLength}/${gridHeight}`
  }).get();
}

const gridSection = (kb: SectionLayout) => {
  const { row, col } = kb.position;

  const styles = styleMap('gridSection');

  if (!kb.grid) {
    styles.add('display', 'grid');
  }

  styles.all({
    'aspect-ratio': `${longestRow(kb.rows)}/${heightMax(kb.rows)}`,
    'grid-column-start': col,
    'grid-column-end': col + 1,
    'grid-row-start': row,
    'grid-row-end': row + kb.rows.length,
    'grid-row-gap': `${KEY_GAP}cqh`,
    'grid-column-gap': `${KEY_GAP}cqw`,
  })

  return styles.get();
}

const sectionRows = (kb: SectionLayout, rowI: number) => {
  const { grid, rows } = kb;

  const styles = styleMap('sectionRows')
      .add('display', 'grid');

  const exact = (num: number) => `repeat(${num}, minmax(0, 1fr))`

  if (grid) {
    styles.add('grid-template-rows', exact(grid.rows));
    styles.add('grid-template-columns', exact(grid.cols));
  } else {
    styles.add('grid-template-rows', '1fr');
    styles.add('grid-template-columns', `repeat(${rowTotal(rows, rowI)}fr)`);
    styles.add('grid-column-gap', `${KEY_GAP}cqw`);
  }

  return styles.get();
}

const hasGrid = (kb: SectionLayout): boolean => {
  return !!kb.grid;
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

const keyOffset = (section: SectionLayout, rowIndex: number, keyIndex: number, key: KeySym): number => {
  if (!key || !key.id) {
    console.warn(`No key ${key}, row: ${rowIndex}`);
    return 0;
  }

  if (section.rows.at(rowIndex)) {
    let r = section.rows.at(rowIndex)!;
    return r.slice(0, keyIndex).reduce((off, k) => off + k.width + (k.offset || 0) + COL_GAP, 0);
  }

  return 0;
}

const gridKey = (section: SectionLayout, rowIndex: number, keyIndex: number, key: KeySym) => {
  const left = keyOffset(section, rowIndex, keyIndex, key);

  const colStart = left + key.offset + 1;

  const styles = styleMap('gridKey');

  if (section.grid) {
    styles.var('griddedKey', 1);
    styles.add('grid-column', `${colStart} / span ${key.width}`);

    if (key.height > 1) {
      styles.add('grid-row', `span ${key.height}`);
    }
  } else {
    styles.var('nonGriddedKey', 1);
    styles.add('grid-column', `${colStart} / span ${key.width}`);
    //styles.add('grid-row', '');
  }

  if (key.height < 1) {
    styles.add('height', `${key.height * 100}%`);
  }

  return styles.get();
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
  <div class="kb-container" :style="gridContainer()">
    <template v-for="$kbSection in $currentKB.sections">
      <template v-if="hasGrid($kbSection)">
        <div :class="[ ...sectionClass($kbSection), 'hg-row' ]"
             :style="[ gridSection($kbSection), sectionRows($kbSection, 0) ]">
          <template v-for="($row, $rowNum) in $kbSection.rows">
            <KeyboardKey v-for="($key, $keyNum) in $row"
                         @key-clicked="b => $emit('onKeyPress', b)"
                         :style="gridKey($kbSection, $rowNum, $keyNum, $key)"
                         :symbol="$key"
                         :row-num="$rowNum+1"
                         :button-num="$keyNum+1"/>
          </template>
        </div>
      </template>
      <template v-else>
        <div :class="sectionClass($kbSection)"
             :style="gridSection($kbSection)">
          <div v-for="($row, $rowNum) in $kbSection.rows"
               :class="[ 'hg-row' ]"
               :style="sectionRows($kbSection, $rowNum)">
            <KeyboardKey v-for="($key, $keyNum) in $row"
                         @key-clicked="b => $emit('onKeyPress', b)"
                         :style="gridKey($kbSection, $rowNum, $keyNum, $key)"
                         :grid-left="keyOffset($kbSection, $rowNum, $keyNum, $key)"
                         :symbol="$key"
                         :row-num="$rowNum+1"
                         :button-num="$keyNum+1"/>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style module="colors">
:global(:root) {
  --std-key-height: 100%;
  --sm-key-height: 75%;
  --default-key-color: rgb(255 255 255);
  --mod-key-color: rgb(180 180 180);
  --std-key-hl-color: rgb(129 86 201);
  --mod-key1-hl-color: rgb(54 187 153);
  --mod-key2-hl-color: rgb(245 159 0);
  --mod-key3-hl-color: rgb(240 62 62);
  --key-text-color: rgb(0 0 0);
  --key-border-color: color-mix(in srgb, var(--default-key-color) 100%, var(--key-text-color) 80%);
  --container-bg-color-dark: rgb(10% 10% 10%);
  --container-bg-color-light: rgb(80% 80% 80%);
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
  padding: 1%;

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
