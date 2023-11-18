<script setup lang="ts">
import { ref } from 'vue';

import UICard from "../layout/UICard.vue";

const props = defineProps<{
  apps: object[]
  selectedApp: object;
}>();

const $debug = ref(false);

const handleAppSelect = () => {};

const clearSelected = () => {};

</script>

<template>
  <div class="shortcut-viewer-controls">
    <UICard title="Select Group">
      <x-label v-if="selectedApp">Selected: {{ selectedApp.name }}</x-label>
      <x-select :value="selectedApp.name">
        <x-menu>
          <x-label>Select an app:</x-label>
          <x-menuitem v-for="app in apps"
                      :value="app.name"
                      :toggled="app.name === selectedApp.name"
                      @click="handleAppSelect">
            <x-label>{{app.name}}</x-label>
          </x-menuitem>
        </x-menu>
      </x-select>
    </UICard>
    <UICard>
      <x-button @click="clearSelected">
        <x-label>Clear</x-label>
      </x-button>
    </UICard>
    <UICard title="Debug">
      <x-switch :toggled="$debug" @click="$debug = !$debug">
        <x-label>Debug</x-label>
      </x-switch>
    </UICard>
  </div>
</template>

<style scoped>

</style>