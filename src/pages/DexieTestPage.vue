<script setup lang="ts">
import { ref, inject, watch, onMounted } from 'vue';
import { injectDexie } from '../providers/inject.ts';
import UICard from '../components/ui/components/UICard.vue';
import { nanoid } from 'nanoid';




</script>

<template>
  <main>
    <UICard title="Dexie Test">
      <x-box>
        <ul>
          <li v-for="app in $apps" :key="app.id">
            {{ app.id }}, {{ app.name }}
          </li>
        </ul>
      </x-box>
      <x-box>
        <x-button @click="addSomeApps" ref="button">
          <x-label>Add some apps</x-label>
        </x-button>
      </x-box>
    </UICard>
  </main>
</template>

<style scoped>

</style>