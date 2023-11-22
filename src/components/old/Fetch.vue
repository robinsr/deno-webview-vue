<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Code from './Code.vue';

type LoadingState = {
  state: 'loading';
}

type SuccessState = {
  state: 'success';
  data: object;
}

type ErrorState = {
  state: 'error';
  error: string;
}

type FetchState = LoadingState | SuccessState | ErrorState;

const dataUrl = "/api/data.json";
const errorUrl = "/api/error.json";
const LOADING = { state: 'loading' };

const url = ref<string>(dataUrl);
const result = ref<FetchState>(LOADING);

let controller: AbortController;

async function fetchData() {
  result.value = LOADING;

  if (controller) {
    console.log('Aborting request');
    controller.abort('User requested abort');
  }

  try {
    controller = new AbortController();
    const request = new Request(url.value);
    const response = await fetch(request, { signal: controller.signal });

    if (response.ok) {
      const json = await response.json();
      //server_log(json);
      result.value = { state: 'success', data: json };
    } else {
      const error = await response.text();
      //server_log(error);
      result.value = { state: 'error', error };
    }

    controller = null;
  } catch (e) {
    if (!(e instanceof DOMException)) {
      throw e;
    }
  }
}

watchEffect(fetchData);

</script>

<template>
  <x-card>
    <main>
      <x-box>
        <h3>Fetch Test</h3>
      </x-box>
      <x-box>
        <x-buttons>
          <x-button condensed @click="url = dataUrl">
            <x-icon href="#info"></x-icon>
            <x-label>Fetch data</x-label>
          </x-button>
          <x-button condensed @click="url = errorUrl">
             <x-icon href="#bug"></x-icon>
            <x-label>Cause error</x-label>
          </x-button>
        </x-buttons>
      </x-box>
      <x-box vertical>
        <p>Url: <code>{{ url }}</code></p>
        <p>Status: <code>{{ result.state }}</code></p>
        <Code :content="result"></Code>
      </x-box>
      <Code v-if="result.state === 'success'" :content="result.data" />
      <Code v-if="result.state === 'error'" :content="result.error" />
    </main>
  </x-card>
</template>

<style scoped>

</style>
