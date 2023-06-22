<template>
  <div id="honeydew-error">
    <div class="honeydew-error_content-frame">
      <h1>404</h1>
      <p>Nothing found here. Go back!</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#honeydew-error {
  display: flex;
  justify-content: center;

  .honeydew-error_content-frame {
    text-align: center;

    h1 {
      font-size: 5rem;
    }
  }
}
</style>
