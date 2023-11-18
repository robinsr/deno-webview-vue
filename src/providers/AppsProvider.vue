<script setup lang="ts">
import { provide } from 'vue';
import apps from '../shortcuts/ShortcutApp.ts';
import { injectApps } from './inject.ts';
provide(injectApps, apps);
</script>

<template>
    <slot />
</template>
