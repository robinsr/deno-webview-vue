<script setup lang="ts">
import { ref } from 'vue';
import { routes } from '../../router.ts';
import ThemeSwitcher from './ThemeSwitcher.vue';
import UICard from './components/UICard.vue';


const dialogEl = ref();

const close = (e: PointerEvent) => {
  dialogEl.value.close();
}
</script>

<template>
  <x-button skin="flat" id="left-drawer-btn">
    <x-label>
      <x-icon href="#menu"></x-icon>
    </x-label>
    <dialog id="sidebar" ref="dialogEl">
      <nav>
        <h1>deno-webview-vue</h1>
        <x-box vertical>
          <h2>Pages</h2>
          <router-link v-for="route in routes" :to="route.path">
            <x-button skin="nav" @click="close">
              <x-icon :href="'#' + route.icon"></x-icon>
              <x-label>{{ route.label }}</x-label>
            </x-button>
          </router-link>
        </x-box>
        <hr>
        <x-box vertical>
          <router-view name="LeftSidebar" />
        </x-box>
        <hr>
        <x-box vertical>
          <h2>Options</h2>
          <UICard>
            <ThemeSwitcher />
          </UICard>
        </x-box>
      </nav>
    </dialog>
  </x-button>
</template>

<style scoped>
#left-drawer-btn {
  margin-right: 0.80em;
}

dialog#sidebar {
  width: 300px;
  height: 100vh;
  left: 0;
  right: auto;
  border-radius: 0;

  & nav {
    box-sizing: border-box;
    padding: 0px 20px;
    margin-bottom: 20px;
    width: 100%;

    & x-box {
      padding: 0.4em 0;
    }

    & h1 {
      font-size: 1.4em;
    }

    & h2 {
      font-size: 1.2em;
    }
  }
}
</style>
