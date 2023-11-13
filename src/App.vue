<script setup lang="ts">
import Menu, { willThisWork } from './components/Menu.vue';
</script>

<template>
  <Menu />
  <section class="content">
    <router-view></router-view>
  </section>
</template>

<style scoped>
section.content {
  margin: 35px auto;
  padding: 0px 70px;
}
</style>
