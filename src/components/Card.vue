<template>
  <div class="honeydew-card">
    <div class="honeydew-card_header" v-if="slots.header">
      <h4><slot name="header"></slot></h4>
    </div>
    <slot></slot>
    <div class="honeydew-card_footer" v-if="slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>
