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
  <x-box>
    <x-switch :toggled="val" @click.stop="$emit('onToggle')">
      <x-label>{{ label }}</x-label>
    </x-switch>
  </x-box>
</template>

<style scoped>

</style>