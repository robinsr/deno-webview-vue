<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@/store/app-store.ts';
import UICard from "../ui/components/UICard.vue";
import UIColumns from '@ui/UIColumns.vue';
import Switch from '../ui/components/UISwitch.vue';

const store = useStore();
const $apps = computed(() => store.data.apps);
const $selectedApp = computed(() => store.data.selectedApp);
const $debug = computed(() => store.debug);

const handleAppSelect = (e: PointerEvent) => {
  store.setSelectedApp(e.target.value);
}

const clearSelected = () => {
  store.setFocus('none');
};

const toggleDebug = () => {
  store.debug = !$debug.value;
}

</script>

<template>
  <UIColumns :count="3" class="shortcut-viewer-controls">
    <UICard title="Select Group">
      <x-label v-if="$selectedApp">Selected: {{ $selectedApp.name }}</x-label>
      <x-select :value="$selectedApp.name">
        <x-menu>
          <x-label>Select an app:</x-label>
          <x-menuitem v-for="app in $apps"
                      :value="app.name"
                      :toggled="app.name === $selectedApp.name"
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
    <UICard>
      <Switch label="Debug" :val="$debug" @on-toggle="toggleDebug"></Switch>
    </UICard>
  </UIColumns>
</template>

<style scoped>
.shortcut-viewer-controls {
  margin-bottom: 15px;
}
</style>