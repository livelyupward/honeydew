<template>
  <div class="honeydew-plain-note"></div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { HoneydewItem } from '../../store.ts';

defineProps<{
  content: HoneydewItem;
}>();
</script>

<style>
.honeydew_note-editor {
  max-height: 500px;
}
</style>
