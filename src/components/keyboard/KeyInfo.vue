<script setup lang="ts">
import { ref } from 'vue';
import Popover from '../layout/Popover.vue';

defineProps<{
  key: string;
}>();

</script>

<template>
  <Popover title="Key Info">
    <code><pre>
      {}
    </pre></code>
  </Popover>
</template>

<style scoped>

</style>