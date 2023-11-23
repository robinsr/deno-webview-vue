<script setup lang="ts">
import { ref, computed } from 'vue';
import { Ear } from 'lucide-vue-next';
import DebugProp from '../old/DebugProp.vue';
import { KeySym } from '@keys/keyboard-key.ts';
import { useStore } from '@/store/app-store.ts';

defineProps<{
  inspect?: object | undefined;
  keys?: KeySym[] | undefined;
  clicked?: object | undefined;
}>();

const store = useStore();

const $debug = computed(() => store.debug);



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
  <section v-if="$debug">
    <section>
      <x-card>
        <main>
          <x-label>Keys:</x-label>
          <DebugProp :obj="keys && keys.map(k => k)" :log="true" />
          <x-label>Clicked:</x-label>
          <DebugProp :obj="clicked" />
        </main>
      </x-card>
    </section>
    <section v-if="$debug && inspect">
      <x-card>
        <main>
          <x-label>Inspect:</x-label>
          <DebugProp :obj="inspect"/>
        </main>
      </x-card>
    </section>
    <section v-if="$debug">
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
