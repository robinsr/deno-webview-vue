<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>()
</script>

<template>
  <x-card class="app-card">
    <main>
      <p v-if="props.title">
        <strong>{{ props.title }}</strong>
      </p>
      <slot/>
    </main>
  </x-card>
</template>

<style scoped>
.app-card {
  break-inside: avoid-column;
  padding: 0;
  margin: 0 10px 15px 10px
}
</style>