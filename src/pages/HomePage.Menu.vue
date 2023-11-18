<script setup lang="ts">
import { inject } from 'vue';
import KeyboardControls from '../components/keyboard/KeyboardControls.vue';
import { injectApps } from '../providers/inject.ts';


const apps = inject(injectApps);

const $apps = Object.values(apps);

</script>

<template>
  <KeyboardControls :apps="$apps" :selected-app="{ name: 'HardcodedApp' }" />
</template>

<style scoped>

</style>