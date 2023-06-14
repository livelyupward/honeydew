<template>
  <h3 class="honeydew-sidebar_heading">
    <slot></slot>
  </h3>
</template>

<script setup lang="ts">
const props = defineProps(['textContent']);
</script>

<style lang="scss" scoped>
.honeydew-sidebar_heading {
  font-size: 1.25rem;
}
</style>
