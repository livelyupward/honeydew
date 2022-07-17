<template>
  <header>
    <h1 class="honeydew-title">{{ titleText ? titleText : "Honeydew" }}</h1>
  </header>
</template>

<script setup>
defineProps({
  titleText: String,
});
</script>

<style lang="scss" scoped>
.honeydew-title {
  font-family: "Maven Pro", sans-serif;
  margin-top: 5px;
}
</style>
