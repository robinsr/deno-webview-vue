<script setup lang="ts">
import { computed, ref, unref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { KeySym } from '@keys/key-types.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import { useViewStore } from '@/store/view-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import KeyInfo from './KeyInfo.vue';
import KBD from '@/components/ui/KBD.vue';

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
       @click.prevent.stop="handleClick"
       :data-skbtn="$id"
       :key="$dataKeyId"
       :class="[ btnClass, { 'highlight-btn': $isActive } ]">
    <span class="cap">{{ $cap }}</span>
    <div :class="[ 'inlay', { 'show': $showInlay } ]">
      <KBD :symbols="$matches" :use-colors="true" :scale="60" />
    </div>
    <KeyInfo :sym="props.symbol" :show="$showInfo" :context="el"></KeyInfo>
  </div>
</template>

<style module="key-colors">
:global(:root) {
  --std-key-hl-color: var(--fuchsia-blue);

  --mod-key-color: var(--boulder);
  --mod1-bg-color: var(--curious-blue);
  --mod2-bg-color: var(--keppel);
  --mod3-bg-color: var(--orange-peel);
  --mod4-bg-color: var(--flamingo);
  --kb-font: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
}

:global([color-scheme="light"]) {
  --keycap-text-color: var(--mine-shaft);
  --keycap-bg-color: var(--catskill-white);
  --keycap-border-color: color-mix(in srgb, var(--catskill-white) 100%, white 80%);
}

:global([color-scheme="dark"]) {
  --keycap-text-color: var(--catskill-white);
  --keycap-bg-color: var(--mine-shaft);
  --keycap-border-color: color-mix(in srgb, var(--mine-shaft) 100%, black 80%);
}
</style>

<style scoped>
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
  border-bottom: 0.1cqw solid var(--keycap-border-color);
  border-radius: 0.4cqw;


  transition: background-color 0.1s ease-out;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 0 3px -1px rgba(0,0,0,.3); /*, var(--key-border-color) 0 3px;*/
  cursor: pointer;

  background-color: var(--keycap-bg-color);

  .cap {
    text-wrap: nowrap;
    font-size: 1cqh;
  }


  &.btn-name-cmd,
  &.btn-name-shift,
  &.btn-name-ctrl,
  &.btn-name-alt {
    background-color: color-mix(in srgb, var(--mod-key-color) 50%, var(--keycap-bg-color));
    border-bottom-color: color-mix(in srgb, var(--mod-key-color) 50%, #000000 75%);
  }

  &.highlight-btn {
    background-color: color-mix(in srgb, var(--std-key-hl-color) 75%, var(--keycap-bg-color));
    border-bottom-color: color-mix(in srgb, var(--std-key-hl-color) 50%, #000000 50%);

    &.btn-name-cmd {
      background-color: color-mix(in srgb, var(--mod1-bg-color) 75%, var(--keycap-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod1-bg-color) 50%, #000000 50%);
    }

    &.btn-name-shift {
      background-color: color-mix(in srgb, var(--mod2-bg-color) 75%, var(--keycap-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod2-bg-color) 50%, #000000 50%);
    }

    &.btn-name-ctrl {
      background-color: color-mix(in srgb, var(--mod3-bg-color) 75%, var(--keycap-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod3-bg-color) 50%, #000000 50%);
    }

    &.btn-name-alt {
      background-color: color-mix(in srgb, var(--mod4-bg-color) 75%, var(--keycap-bg-color));
      border-bottom-color: color-mix(in srgb, var(--mod4-bg-color) 50%, #000000 50%);
    }
  }

  .inlay {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;

    &.show {
      opacity: 1;
    }
  }
}

</style>