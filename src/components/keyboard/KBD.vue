<script setup lang="ts">
import { ref } from 'vue';
import { KeySym } from '../../keys/keyboard-symbol.ts';

const props = defineProps<{
  symbols: KeySym[];
}>();

const vKey = ref<string>(props.symbols.map(sym => sym.id).join('-'));

</script>

<template>
  <span>
    <kbd :data-keys="vKey" v-for="s in props.symbols" :key="s.id">
      {{ s.display.kbd }}
    </kbd>
  </span>
</template>

<style scoped>
kbd {
  --idk-yet: rgba(0, 0, 0, 1.0);

  font-size: 1.2em;
  border: 1px solid var(--idk-yet);
  border-radius: 2px;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>