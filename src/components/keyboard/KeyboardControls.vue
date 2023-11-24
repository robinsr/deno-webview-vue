<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@/store/app-store.ts';
import { useDataStore } from '@/store/data-store.ts';
import UICard from "@ui/UICard.vue";
import UIColumns from '@ui/UIColumns.vue';
import Switch from '@ui/UISwitch.vue';

const store = useStore();
const $debug = computed(() => store.debug);

const data = useDataStore();
const $apps = computed(() => data.apps);
const $selectedApp = computed(() => data.selectedApp);

</script>

<template>
  <div>
    <UICard title="Select Group">
      <x-label v-if="$selectedApp">Selected: {{ $selectedApp.name }}</x-label>
      <x-select :value="$selectedApp.name">
        <x-menu>
          <x-label>Select an app:</x-label>
          <x-menuitem v-for="app in $apps"
                      :value="app.name"
                      :toggled="app.name === $selectedApp.name"
                      @click="() => data.setSelectedApp(app.name)">
            <x-label>{{app.name}}</x-label>
          </x-menuitem>
        </x-menu>
      </x-select>
    </UICard>
    <UICard>
      <x-button @click="() => store.setFocus('none')">
        <x-label>Clear</x-label>
      </x-button>
    </UICard>
    <UICard>
      <Switch label="Debug"
              :val="$debug"
              @on-toggle="() => store.toggleDebug()" />
    </UICard>
  </div>
</template>

<style scoped>

</style>