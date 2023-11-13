<script setup lang="ts">
import { ref } from 'vue';
import { Ear } from 'lucide-vue-next';

defineProps<{
  inspect: object | undefined;
}>()

const $$keyRef = ref(null);
const $capture = ref<boolean>(false);
const $lastEvent = ref<object>();

const keyCapturer = e => {
  const { key, code, keyCode, repeat, altKey, ctrlKey, metaKey, shiftKey } = e;
  $lastEvent.value = { key, code, keyCode, repeat, altKey, ctrlKey, metaKey, shiftKey }
}

const startCapture = () => {
  $capture.value = true;
  $$keyRef.value.addEventListener('keyup', keyCapturer);
  $$keyRef.value.focus();
}

const stopCapture = () => {
  $capture.value = false;
  $$keyRef.value.removeEventListener('keyup', keyCapturer);
}
</script>

<template>
  <section>
    <section v-if="inspect">
      <x-card>
        <main>
          <x-label>Inspect:</x-label>
          <ul>
            <li v-for="(prop, key) in inspect">
              {{ key }}: <code>{{ prop }}</code>
            </li>
          </ul>
        </main>
      </x-card>
    </section>
    <section>
      <x-card>
        <main>
          <x-label>Capture Key Events</x-label>
          <x-buttons>
            <x-button @click="startCapture">
              <Ear /> Start Capture
            </x-button>
            <x-button @click="stopCapture">
              Stop Capture
              <x-icon href="#"></x-icon>
            </x-button>
          </x-buttons>
          <input type="text" value="" v-show="$capture" ref="$$keyRef" />
          <div v-if="$capture"><pre>{{ JSON.stringify($lastEvent, null, 2) }}</pre></div>
        </main>
      </x-card>
    </section>
  </section>
</template>
