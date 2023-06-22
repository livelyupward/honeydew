<template>
  <section class="honeydew-stage" @drop="runDrop" @dragenter="cancelDefault" @dragover="cancelDefault">
    <SpaceFragment v-for="content in getSpaceContent.content">
      {{ content.text }}
    </SpaceFragment>
    <NewFragment />
  </section>
</template>

<script setup lang="ts">
import SpaceFragment from '../SpaceFragment.vue';
import NewFragment from '../NewFragment.vue';
import { mainStore } from '../../store.ts';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { getSpaceContent } = storeToRefs(store);

function runDrop(event) {
  const data = event.dataTransfer.getData('text/html');
  console.log('data _', data);
  // event.target.textContent = data;
  // event.preventDefault();
}

function cancelDefault(event) {
  event.preventDefault();
}
</script>

<style lang="scss" scoped>
.honeydew-stage {
  max-width: 65em;
}

.honeydew-homepage_header-heading {
  font-size: 2.125rem;
  font-weight: 900;
  margin: 0 30px;
}
</style>
