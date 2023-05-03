<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkable from './components/Checkable.vue';
import Card from './components/Card.vue';

const good = ref(false);
</script>

<style lang="scss">
@import 'mixins';
@import 'variables';
/*
Card component
 */
.honeydew-card {
  border: 1px solid lighten(#4c6e91, 25%);
  margin: 0.875rem;
  @include shadow-sm;
  @include main-border;

  .honeydew-card_header {
    background-color: $color3;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 0.375rem 0.875rem;

    h4 {
      color: #fff;
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 0;
    }
  }

  ul {
    padding-top: 0;
    padding-bottom: 0;

    li {
      padding: 0.875rem 0;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
