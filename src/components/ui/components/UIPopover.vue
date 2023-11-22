<script setup lang="ts">
import { ref } from 'vue';

declare interface XPopoverElement extends HTMLElement {
  open(context: any, animate?: boolean): Promise<HTMLElement>;
  close(animate?: boolean): Promise<HTMLElement>;
}

const el = ref<XPopoverElement | null>(null);

const show = (contextEl: Element) => {
  el.value?.open(contextEl);
}

const hide = (e?: PointerEvent) => {
  el.value?.close();
}

defineExpose<{
  show: (contextEl: Element) => void;
  hide: () => void;
}>({ show, hide });

</script>

<template>
  <span class="popover-container" @click.stop="hide">
    <x-popover modal style="--align: top;" ref="el">
      <main>
        <slot/>
      </main>
    </x-popover>
  </span>
</template>

<style scoped>

</style>