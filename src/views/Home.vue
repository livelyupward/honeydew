<template>
  <div id="app-container">
    <Suspense>
      <Sidebar />
      <template #fallback> Loading sidebar... </template>
    </Suspense>
    <Suspense>
      <router-view></router-view>
      <template #fallback> Loading your data... </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '../fragments/Sidebar/Sidebar.vue';
</script>

<style lang="scss" scoped>
main.honeydew_main-container {
  overflow-y: auto;
  padding: 1.25rem;
}
</style>
