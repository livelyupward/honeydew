<template>
  <main class="honeydew_main-container">
    <InteractiveStage />
  </main>
</template>

<script setup>
import InteractiveStage from '../fragments/Stage/InteractiveStage.vue';
</script>

<style lang="scss" scoped>
main.honeydew_main-container {
  overflow-y: auto;
  padding: 1.25rem;
}
</style>
