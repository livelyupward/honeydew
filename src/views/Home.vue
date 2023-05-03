<template>
  <div id="app-container">
    <Sidebar />
    <main>
      <h1>We are testing here.</h1>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/sidebar/Sidebar.vue';
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100vh;
}
</style>
