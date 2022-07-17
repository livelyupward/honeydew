<template>
  <header class="honeydew-header">
    <h1 class="honeydew-title">{{ titleText ? titleText : "honeydew" }}</h1>
  </header>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  titleText: String,
});
</script>

<style lang="scss" scoped>
.honeydew-header {
}

.honeydew-title {
  font-family: "Maven Pro", sans-serif;
  font-size: 48px;
  margin: 5px 0 15px;
}
</style>
