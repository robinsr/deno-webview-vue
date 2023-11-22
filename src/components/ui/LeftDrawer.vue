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
  <x-button skin="flat">
    <x-label>
      <x-icon href="#menu"></x-icon>
    </x-label>
    <dialog id="sidebar" ref="dialogEl" >
      <nav>
        <router-link v-for="route in routes" :to="route.path">
          <x-button skin="nav" @click="close">
            <x-icon :href="'#' + route.icon"></x-icon>
            <x-label>{{ route.label }}</x-label>
          </x-button>
        </router-link>
        <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
        <UICard>
          <ThemeSwitcher />
        </UICard>
      </nav>
    </dialog>
  </x-button>
</template>

<style scoped>
dialog#sidebar {
  width: 300px;
  height: 100vh;
  left: 0;
  right: auto;
  border-radius: 0;
}

dialog#sidebar nav {
  box-sizing: border-box;
  padding: 0px 20px;
  margin-bottom: 20px;
  width: 100%;
}
</style>
