<template>
  <GoogleLogin :callback="callback" />
</template>

<script setup lang="ts">
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);
};
</script>

<style lang="scss" scoped></style>
