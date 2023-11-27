<script setup lang="ts">
//import "simple-keyboard/build/css/index.css";
import type {
  KeySym,
  KeyboardSpec,
  SectionLayout,
  KeyboardRow
} from '@keys/key-types.ts'

import { ref, computed, watchEffect } from 'vue';
import { useViewStore, KeyboardSettings } from '@/store/view-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import KeyboardKey from './KeyboardKey.vue';
import { styleMap } from './style-map.ts';


const emit = defineEmits<{
  (e: 'onKeyPress', key: { button: string; }): void;
}>();

const viewStore = useViewStore();

const kb = computed(() => ({
  spec: viewStore.keyboard.spec,
  settings: viewStore.keyboard.settings,
}));

const kbSettings: KeyboardSettings = kb.value.settings;
const kbSpec: KeyboardSpec = kb.value.spec;


const dataStore = useDataStore();
const appId = computed(() => dataStore.selectedApp.id);

const COL_GAP = 0;
const GRID_GAP = 1;
const KEY_GAP = GRID_GAP * 0.3;

const gridContainer = computed(() => {
  const { rows: rowConfig } = kbSpec.grid;

  const sections = filterSections();

  const columnCount = Math.max(...sections
      .map(section => section.position.col));

  const emptyArr = Array.from({ length: columnCount }, () => [] as KeyboardRow[]);
  const stackedColumns = sections
      .reduce((acc, section) => {
        acc[section.position.col - 1].push(...section.rows);
        return acc;
      }, emptyArr)
      .filter(col => col.length > 0);

  const columnGridWidths = stackedColumns.map(rows => longestRow(rows))
  const totalGridWidth = columnGridWidths.reduce((t, x) => t + x, 0);

  const rows = sections.map(section => section.rows);
  const gridHeight = tallest(rows);

  const _debug = { sections, rows, columnCount, stackedColumns, columnGridWidths, totalGridWidth, gridHeight }
  //console.debug(_debug);

  const gridColumnFrs = columnGridWidths
      .map(l => `${Math.floor((l*100) / totalGridWidth)}fr`)
      .join(' ');

  return styleMap('gridContainer').all({
    'display': 'grid',
    'grid-template-columns': gridColumnFrs,
    'grid-template-rows': `repeat(${rowConfig}, 1fr)`,
    'grid-row-gap': `${GRID_GAP * 4}%`,
    'grid-column-gap': `${GRID_GAP * 3}%`,
    'aspect-ratio': `${totalGridWidth}/${gridHeight}`
  }).get();
});

const filterSections = (): SectionLayout[] => {
  const sections = Object.values(kbSpec.sections).filter(section => {
    return (kbSettings.showSections || []).includes(section.name)
  });

  const clampColumns = sections
      .map(section => section.position.col)
      .reduce((set, section) => set.add(section), new Set()).size;

  return sections.map(section => {
    return {
      ...section,
      position: {
        row: section.position.row,
        col: Math.min(section.position.col, clampColumns)
      }
    }
  });
}

const gridSection = (section: SectionLayout) => {
  const { row, col } = section.position;

  const styles = styleMap('gridSection');

  if (!section.grid) {
    styles.add('display', 'grid');
  }

  styles.all({
    'aspect-ratio': `${longestRow(section.rows)}/${heightMax(section.rows)}`,
    'grid-column-start': col,
    'grid-column-end': col + 1,
    'grid-row-start': row,
    'grid-row-end': row + section.rows.length,
    'grid-row-gap': `${KEY_GAP}cqh`,
    'grid-column-gap': `${KEY_GAP}cqw`,
  });

  // styles.all({
  //   'container-type': 'inline-size',
  //   'container-name': 'kb-section-container',
  // });

  return styles.get();
}

const sectionRows = (section: SectionLayout, rowI: number) => {
  const { grid, rows } = section;

  const styles = styleMap('sectionRows')
      .add('display', 'grid');

  const exact = (num: number) => `repeat(${num}, minmax(0, 1fr))`

  if (grid) {
    styles.add('grid-template-rows', exact(grid.rows));
    styles.add('grid-template-columns', exact(grid.cols));
  } else {
    styles.add('grid-template-rows', '1fr');
    styles.add('grid-template-columns', `repeat(${rowWidth(rows, rowI)}fr)`);
    styles.add('grid-column-gap', `${KEY_GAP}cqw`);
  }

  return styles.get();
}

const hasGrid = (section: SectionLayout): boolean => {
  return !!section.grid;
}

// todo - determine programmatically
const KEY_HEIGHT = 7;

const tallest = (rows: KeyboardRow[][]): number => {
  return Math.max(...rows.map(row => heightMax(row)));
}

const heightMax = (rows: KeyboardRow[]): number => {
  return rows.length * KEY_HEIGHT;
}

const rowWidth = (rows: KeyboardRow[], rowIndex: number): number => {
  return rows[rowIndex].reduce((off, k) => off + k.width + COL_GAP, 0);
}

const longestRow = (rows: KeyboardRow[]): number => {
  return Math.max(...rows.map((_r, i) => rowWidth(rows, i)));
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

const keyId = (section: SectionLayout, rowNum: number, buttonNum: number) => {
  return `${appId.value}-${section.name}-r${rowNum}-b${buttonNum}`;
}

const sectionClass = (section: SectionLayout) => {
  return [
    'kb-section',
    `kb-section-${section.name}`,
    'vue-shortcuts',
    'grid-layout',
  ]
}

watchEffect(() => console.log(gridContainer.value));

</script>

<template>
  <div class="kb-container" :style="gridContainer">
    <template v-for="$kbSection in filterSections()">
      <template v-if="hasGrid($kbSection)">
        <div :class="[ ...sectionClass($kbSection), 'hg-row' ]"
             :style="[ gridSection($kbSection), sectionRows($kbSection, 0) ]">
          <template v-for="($row, $rowNum) in $kbSection.rows">
            <KeyboardKey v-for="($key, $keyNum) in $row"
                         :key="keyId($kbSection, $rowNum, $keyNum)"
                         :id="keyId($kbSection, $rowNum, $keyNum)"
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
                         :key="keyId($kbSection, $rowNum, $keyNum)"
                         :id="keyId($kbSection, $rowNum, $keyNum)"
                         @key-clicked="b => $emit('onKeyPress', b)"
                         :style="gridKey($kbSection, $rowNum, $keyNum, $key)"
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
:global([color-scheme="light"]) {
  --kb-container-bg-color: rgb(80% 80% 80%);
}

:global([color-scheme="dark"]) {
  --kb-container-bg-color: rgb(40% 40% 40%);
}
</style>

<style scoped>
input {
  border: none;
}

.kb-container {
  container-type: inline-size;
  container-name: kb-container;
  width: unset;
  max-width: 1600px;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1%;

  border-radius: 5px;

  background-color: var(--kb-container-bg-color);
  color: var(--keycap-text-color);

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
