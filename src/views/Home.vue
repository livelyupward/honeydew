<template>
  <main class="honeydew_main-container">
    <SortableStage />
  </main>
</template>

<script setup>
import SortableStage from '../fragments/Stage/SpaceStage.vue';
</script>

<style lang="scss" scoped>
main.honeydew_main-container {
  overflow-y: auto;
  padding: 1.25rem;
}
</style>
