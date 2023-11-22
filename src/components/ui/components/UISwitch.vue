<script setup lang="ts">
defineProps<{
  label: string;
  val: boolean;
}>()

defineEmits<{
  (e: 'toggled'): void;
}>();
</script>

<template>
  <x-switch :toggled="val" @click.stop="$emit('toggled')">
    <x-label>{{ label }}</x-label>
  </x-switch>
</template>

<style scoped>

</style>