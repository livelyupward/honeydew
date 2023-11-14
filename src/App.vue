<template>
  <router-view> </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
#app {
  background-color: $black;
  min-height: 100vh;
  overflow: hidden;
}

#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100vh;
}

/*
Card component
 */
.honeydew-card {
  @include shadow-sm;
  @include main-border;
  border: 1px solid lighten(#4c6e91, 25%);
  margin: 0.875rem;

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
