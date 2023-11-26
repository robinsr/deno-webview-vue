<script setup lang="ts">
defineProps<{
  count: number
}>();
</script>

<template>
  <div class="app-columns">
    <slot />
  </div>
</template>

<style scoped>
.app-columns {
  column-gap: 15px;

  @media screen and (min-width: 920px) {
    column-count: v-bind('count');
  }

  @each $bp, $cols in (600px, 920px), (1, 2) {
    @media screen and (max-width: $bp) {
      column-count: $cols;
    }
  }
}

.app-column :deep(*) {
  break-inside: avoid-column;
}
</style>