<template>
  <div id="app-container">
    <Sidebar />
    <main class="honeydew_main-container">
      <h1>We are testing here.</h1>
      <component
        v-for="contentItem in json"
        :is="fragmentMap[contentItem.type]"
        :content="{ ...contentItem }"
      ></component>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../fragments/Sidebar/Sidebar.vue';
import { fragmentMap } from '../fragmentMap.js';
import json from '../assets/kanban.json';
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
