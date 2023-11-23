<script setup lang="ts">
import { provide } from 'vue';
import { nanoid } from 'nanoid';

import { injectApps, injectDexie } from './inject.ts';
import apps from '../shortcuts/ShortcutApp.ts';
import { db } from './db.ts';


provide(injectApps, apps);
provide(injectDexie, db);
provide('app-id', nanoid(12));

</script>

<template>
    <slot />
</template>
