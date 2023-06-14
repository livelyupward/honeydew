<template>
  <div class="honeydew-content">
    <div v-for="contentItem in content" class="honeydew-content_item">
      <component :is="fragmentMap[contentItem.type]" :content="{ ...contentItem }"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fragmentMap } from '../fragmentMap.js';

const props = defineProps({
  content: Array,
});
</script>

<style scoped></style>
