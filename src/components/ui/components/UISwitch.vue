<script setup lang="ts">
defineProps<{
  label: string;
  val: boolean;
}>()

defineEmits<{
  (e: 'onToggle'): void;
}>();
</script>

<template>
  <x-switch :toggled="val" @click.stop="$emit('onToggle')">
    <x-label>{{ label }}</x-label>
  </x-switch>
</template>

<style scoped>

</style>