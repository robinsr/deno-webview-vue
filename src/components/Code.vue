<script setup lang="ts">
import { ref, defineProps } from 'vue';
defineProps<{ content: string | object }>();
</script>

<template>
  <x-box class="code-view">
    <code content="">{{ content }}</code>
  </x-box>
</template>

<style scoped>
  .code-view {
    background: var(--light-background-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
  }

  code {
    display: block;
    white-space: pre-wrap;
    overflow-x: auto;
    font-size: 13px;
    line-height: 18px;
    outline: 0px;
    background: 0px 0px;
    padding: 0px;
  }
</style>