<script setup lang="ts">
import { withDefaults } from 'vue';

const props = withDefaults(defineProps<{
  obj: unknown;
  log?: boolean
}>(), {
  log: false
});

const isObj = (obj: unknown) => typeof obj === "object";

</script>

<template>
  <ul>
    <li v-for="(prop, key) in obj">
      <span v-if="isObj(prop)">
        <code class="key">{{ key }}:</code> <DebugProp :obj="prop" />
      </span>
      <span v-else>
        <code class="key">{{ key }}:</code> <code>{{ prop }}</code>
      </span>
    </li>
  </ul>
</template>

<style scoped>
code.key {
  outline: none;
  color: var(--fuchsia-blue);
}
</style>