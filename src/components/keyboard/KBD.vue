<script setup lang="ts">
import { ref } from 'vue';
import { KeySym } from '@keys/key-types.ts';

const props = defineProps<{
  symbols: KeySym[];
}>();

const vKey = ref<string>(props.symbols.map(sym => sym.id).join('-'));

const $symbols: KeySym[] = props.symbols;

</script>

<template>
  <span :data-keys="vKey">
    <kbd v-for="$s in $symbols" :key="$s.id" :class="{
      ['key-' + $s.type]: true,
      ['key-' + $s.id]: true,
    }">
      {{ $s.legend.kbd }}
    </kbd>
  </span>
</template>

<style scoped>
kbd {
  --idk-yet: rgba(0, 0, 0, 1.0);

  font-size: 1.0em;
  border: 1px solid var(--idk-yet);
  border-radius: 2px;
  margin-left: 0.25em;
  margin-right: 0.25em;
  padding: 0.125em 0.25em 0.125em 0.25em;

  &.key-mod,
  &.key-ws,
  &.key-arrow {
    font-size: 1.2em;
  }

  &.key-meta {
    color: var(--keppel);
  }

  &.key-shift {
    color: var(--orange-peel);
  }

  &.key-ctrl {
    color: var(--flamingo);
  }

  &.key-alt {
    color: var(--flamingo);
  }
}

kbd[data-code="⌘"] {
}
</style>