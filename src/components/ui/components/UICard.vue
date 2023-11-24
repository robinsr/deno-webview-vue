<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>()
</script>

<template>
  <x-card class="app-card">
    <main>
      <div v-if="props.title" class="card-title">
        <p>
          <strong>{{ props.title }}</strong>
        </p>
        <hr />
      </div>
      <div class="card-content">
        <slot/>
      </div>
    </main>
  </x-card>
</template>

<style scoped>
x-card.app-card {
  --is-ui-card: 1;
  break-inside: avoid-column;
  box-sizing: border-box;
  padding: 8px 10px;
  margin: 0 10px 15px 10px;

  & main {
    padding: 0;
    margin: 0;
  }

  .card-title {
    margin: 0 0 15px 0;

    & p {
      margin: 0;
      padding: 0;
    }
  }

  .card-content {
    margin: 0;
  }

  .card-title ~ .card-content {
    margin-top: 10px;
  }
}
</style>