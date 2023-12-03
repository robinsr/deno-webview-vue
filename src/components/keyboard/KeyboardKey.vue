<script setup lang="ts">
import { computed, ref, unref, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import { KeySym } from '@keys/key-types.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import { useStore } from '@/store/app-store.ts';
import { useViewStore } from '@/store/view-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import KeyInfo from './KeyInfo.vue';
import KBD from '@/components/ui/KBD.vue';
import type { HotKey } from '@/shortcuts/ShortcutApp.ts';

const store = useStore();
store.addCssVar('--keycap-text-color', '');
store.addCssVar('--keycap1-bg-color', '');

const emit = defineEmits<{
  (e: 'keyClicked', item: { button: string; }): void;
}>();

const props = defineProps<{
  symbol: KeySym;
  rowNum: number;
  buttonNum: number;
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
const $showInlay = computed(() => view.keyboard.settings.kbDisplay === 'inlay');

const data = useDataStore();
const dataRefs = storeToRefs(data);

const $hotkeys: ComputedRef<HotKey[]> = computed(() => {
  return dataRefs.selectedApp.value?.matchKey(id) || [];
})

const $modkeys: ComputedRef<KeySym[]> = computed(() => {
  if (type === 'mod') {
    return [];
  }

  const modKeys = $hotkeys.value.flatMap(hotkey => {
    return [ 'meta', 'ctrl', 'alt', 'shift' ].filter(modKey => {
      return !!hotkey.symbols.find(sym => sym.matches(modKey));
    });
  });

  return Array.from(new Set<string>(modKeys))
      .map(modKey => SYMBOL_MAP.get(modKey));
});

const handleClick = (e: PointerEvent) => {
  if (e.shiftKey) {
    console.log(props.symbol);
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
       @click.prevent.stop="handleClick"
       :data-skbtn="$id"
       :class="[ btnClass, { 'highlight-btn': $isActive } ]">
    <div :class="[ 'inlay', { 'show': $showInlay } ]">
      <KBD
          :symbols="$modkeys"
          :use-colors="true"
          font-size="0.6cqh"/>
    </div>
    <span class="cap">{{ $cap }}</span>
    <KeyInfo
        :sym="props.symbol"
        :modKeys="$modkeys"
        :hotKeys="$hotkeys"
        :show="$showInfo"
        :context="el"/>
  </div>
</template>


<style scoped>
@import url("@/styles/key-colors.css");
@import url("@/styles/fonts.css");

.ex-hg-button {
  container-type: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 0.15cqw solid var(--keycap1-border-color);
  border-radius: 0.4cqw;

  position: relative;

  transition: background-color 0.1s ease-out;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 0 3px -1px rgba(0,0,0,.3); /*, var(--key-border-color) 0 3px;*/
  cursor: pointer;

  background-color: var(--keycap1-bg-color);

  .cap {
    text-wrap: nowrap;
    font-size: 1cqh;
    font-family: var(--font-helvetica);
    color: v-bind(--keycap-text-color);
  }


  &.btn-name-cmd,
  &.btn-name-shift,
  &.btn-name-ctrl,
  &.btn-name-alt {
    background-color: var(--keycap3-bg-color);
    border-bottom-color: var(--keycap3-border-color);
  }

  &.highlight-btn {
    background-color: var(--keycap2-bg-color);
    border-bottom-color: var(--keycap2-border-color);

    &.btn-name-cmd {
      background-color: var(--keycap4-bg-color);
      border-bottom-color: var(--keycap4-border-color);
    }

    &.btn-name-shift {
      background-color: var(--keycap5-bg-color);
      border-bottom-color: var(--keycap5-border-color);
    }

    &.btn-name-ctrl {
      background-color: var(--keycap6-bg-color);
      border-bottom-color: var(--keycap6-border-color);
    }

    &.btn-name-alt {
      background-color: var(--keycap7-bg-color);
      border-bottom-color: var(--keycap7-border-color);
    }
  }

  .inlay {
    height: 0;
    display: inline-block;
    overflow: hidden;
    transition: height 800ms;

    position: absolute;
    left: 0;
    top: 0;

    &.show {
      height: 2cqh;
    }
  }

  .inlay > span {
    display: inline-flex;
  }
}

</style>