<script setup lang="ts">
import { provide } from 'vue';
import apps from '../shortcuts/ShortcutApp.ts';
import { injectApps } from './inject.ts';
provide(injectApps, apps);

import { nanoid } from 'nanoid';

provide('app-id', nanoid(12));

</script>

<template>
    <slot />
</template>
