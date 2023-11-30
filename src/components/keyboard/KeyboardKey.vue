<script setup lang="ts">
import { computed, ref, unref, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import { KeySym } from '@keys/key-types.ts';
import { SYMBOL_MAP } from '@keys/symbol.ts';
import { useViewStore } from '@/store/view-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import KeyInfo from './KeyInfo.vue';
import KBD from '@/components/ui/KBD.vue';
import type { HotKey } from '@/shortcuts/ShortcutApp.ts';

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

  position: relative;

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