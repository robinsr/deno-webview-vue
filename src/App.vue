<script setup lang="ts">
import MenuBar from './components/ui/MenuBar.vue';
import AppsProvider from './providers/AppsProvider.vue';
</script>

<template>
  <AppsProvider>
    <MenuBar />
    <section id="app-content">
      <router-view></router-view>
    </section>
  </AppsProvider>
</template>

<style>
#app-content {
  margin: 35px auto;
  padding: 0px 70px;

  --catskill-white: rgba(237, 245, 247, 1.0);
  --mine-shaft: rgba(39, 39, 39, 1.0);
  --boulder: rgba(124, 124, 124, 1.0);
  --scorpion: rgba(91, 91, 91, 1.0);
  --fuchsia-blue: rgba(129, 86, 201, 1.0);
  --keppel: rgba(54, 187, 153, 1.0);
  --orange-peel: rgba(245, 159, 0, 1.0);
  --flamingo: rgba(240, 62, 62, 1.0);
}
</style>
