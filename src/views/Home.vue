<template>
  <div id="app-container">
    <Sidebar />
    <main class="honeydew_main-container">
      <InteractiveStage />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../fragments/Sidebar/Sidebar.vue';
import InteractiveStage from '../fragments/Stage/InteractiveStage.vue';
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}

#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100vh;
}

main.honeydew_main-container {
  overflow-y: auto;
  padding: 1.25rem;
}
</style>
