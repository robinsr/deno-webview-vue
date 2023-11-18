<script>
export default {
  name: "Popover",
  props: {
    title: String
  }
}
</script>

<template>
  <x-popover modal style="--align: top;">
    <main>
      <x-label>{{ title }}</x-label>
      <slot/>
    </main>
  </x-popover>
</template>

<style scoped>

</style>