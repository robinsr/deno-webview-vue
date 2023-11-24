<script setup lang="ts">
import { computed, ref, unref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { KeySym } from '@keys/key-types.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import { useViewStore } from '@/store/view-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import KeyInfo from './KeyInfo.vue';
import KBD from '@/components/keyboard/KBD.vue';

const emit = defineEmits<{
  (e: 'keyClicked', item: { button: string; }): void;
}>();

const props = defineProps<{
  symbol: KeySym;
  rowNum: number;
  buttonNum: number;
  gridLeft?: number;
}>();

const el = ref(null);
const $showInfo = ref(false);

const { id, name, legend, width, height, type } = unref(props.symbol);

const $id = ref(id);
const $name = ref(name);
const $cap = ref(legend.cap);

const profile = 'default';


const view = useViewStore();
const $isActive = computed(() => view.keyIds.includes(id));
const $showInlay = computed(() => view.kbMode === 'inlay');

const data = useDataStore();

const dataRefs = storeToRefs(data);

const $matches = computed(() => {
  if (type === 'mod') {
    return [];
  }

  const hotkeys = dataRefs.selectedApp.value?.matchKey(id) || [];

  return hotkeys.flatMap(hk => {
    return [ 'meta', 'ctrl', 'alt', 'shift' ].filter(modKey => {
      return !!hk.symbols.find(sym => sym.matches(modKey));
    });
  })
  .reduce((acc, modKey) => Array.from(new Set([ ...acc, modKey ])), [])
  .map(modKey => SYMBOL_MAP.get(modKey));
});

const $dataKeyId = computed(() => {
  return dataRefs.selectedApp.value.id + `-r${props.rowNum}-b${props.buttonNum}`;
});

const handleClick = (e: PointerEvent) => {
  if (e.shiftKey) {
    $showInfo.value = !$showInfo.value;
  } else {
    if (view.focus === 'key' && view.keyIds[0] === props.symbol.id) {
      view.setFocus('none');
    } else {
      view.setFocus('key', props.symbol);
    }
  }
}

const btnClass = [
  'ex-hg-button',
  'hg-functionBtn',
  'btn-id-' + id,
  'btn-name-' + name,
]

</script>

<template>
  <div ref="el"
       style="position: relative;"
      @click.prevent.stop="handleClick"
      :data-skbtn="$id"
      :key="$dataKeyId"
      :class="[ btnClass, { 'highlight-btn': $isActive } ]">
    <span>{{ $cap }}</span>
    <div class="ex-hg-button-inlay" :style="{ 'opacity': $showInlay ? 100 : 0 }">
      <KBD :symbols="$matches" :use-colors="true" :scale="50" />
    </div>
    <KeyInfo :sym="props.symbol" :show="$showInfo" :context="el"></KeyInfo>
  </div>
</template>

<style scoped>
.ex-hg-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1/5% solid var(--key-border-color);
  border-radius: calc(0.4cqw);

  text-wrap: nowrap;
  font-size: 0.85cqw;

  transition: background-color 0.1s ease-out;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 0 3px -1px rgba(0,0,0,.3); /*, var(--key-border-color) 0 3px;*/
  cursor: pointer;

  background-color: var(--kb-bg-color);


  &.btn-name-cmd,
  &.btn-name-shift,
  &.btn-name-ctrl,
  &.btn-name-alt {
    background-color: color-mix(in srgb, var(--mod-key-color) 50%, var(--kb-bg-color));
    border-bottom-color: color-mix(in srgb, var(--mod-key-color) 50%, #000000 75%);
  }

  &.highlight-btn {
    background-color: color-mix(in srgb, var(--std-key-hl-color) 75%, var(--kb-bg-color));
    border-bottom-color: color-mix(in srgb, var(--std-key-hl-color) 50%, #000000 50%);

    &.btn-name-cmd {
      background-color: color-mix(in srgb, var(--mod1-bg-color) 75%, var(--kb-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod1-bg-color) 50%, #000000 50%);
    }

    &.btn-name-shift {
      background-color: color-mix(in srgb, var(--mod2-bg-color) 75%, var(--kb-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod2-bg-color) 50%, #000000 50%);
    }

    &.btn-name-ctrl {
      background-color: color-mix(in srgb, var(--mod3-bg-color) 75%, var(--kb-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod3-bg-color) 50%, #000000 50%);
    }

    &.btn-name-alt {
      background-color: color-mix(in srgb, var(--mod3-bg-color) 75%, var(--kb-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod3-bg-color) 50%, #000000 50%);
    }
  }

  .ex-hg-button-inlay {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}

</style>