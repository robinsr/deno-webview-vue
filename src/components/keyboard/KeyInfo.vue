<script setup lang="ts">
import type { KeySym } from '@keys/key-types.ts'
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import UIPopover from '../ui/components/UIPopover.vue';


const props = defineProps<{
  show: boolean;
  sym: KeySym;
  context: Ref
}>();

const title = `Key: ${props.sym.name}`;

const popover = ref<InstanceType<typeof UIPopover> | null>(null);

const showPopover = () => popover.value?.show(props.context);
const hidePopover = () => popover.value?.hide();

watch(() => props.show, (val, prevVal) => {
  if (val) {
    showPopover();
  } else {
    hidePopover();
  }
});
</script>

<template>
  <UIPopover :title="title" class="key-info-popover" ref="popover">
    <x-label><strong>{{ title }}</strong></x-label>
    <ul v-if="props.show">
      <li>ID: <code>{{ props.sym.id }}</code></li>
      <li>Accepts: <code v-for="form in props.sym.forms">{{form}}</code></li>
      <li>Sizes:
        <ul>
          <li v-for="s in props.sym.sizes">{{s}}</li>
        </ul>
      </li>
    </ul>
  </UIPopover>
</template>

<style scoped>
.key-info-popover {
  font-size: 1rem;

  strong {
    font-size: 1.1em;
  }
}
</style>