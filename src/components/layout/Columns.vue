<script setup lang="ts">
defineProps<{
  count: number
}>();
</script>

<template>
  <section class="app-columns">
    <slot />
  </section>
</template>

<style>
section.app-columns {
  column-count: v-bind('count');
  column-gap: 15px;
}

section.app-columns > * {
  break-inside: avoid-column;
}
</style>