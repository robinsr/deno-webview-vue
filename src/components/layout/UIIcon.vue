<script setup lang="ts">
import {
  Save
} from 'lucide-vue-next';

const props = defineProps<{
  icon: string;
}>()

</script>

<template>
  <template v-if="props.icon === 'save'">
<!--    <Save size="12" />-->
    <x-icon href="https://unpkg.com/lucide-static@latest/icons/save.svg"></x-icon>
    <x-icon href="https://xel-toolkit.org/iconsets/fluent.svg#lock"></x-icon>
  </template>
</template>

<style scoped>

</style>