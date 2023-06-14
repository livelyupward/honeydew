<template>
  <section class="honeydew-stage">
    <PageContent :content="content" />
    <CreateFragment></CreateFragment>
  </section>
</template>

<script setup lang="ts">
import PageContent from '../PageContent.vue';
import CreateFragment from '../CreateFragment.vue';
import { mainStore } from '../../store.ts';

const store = mainStore();

const json = store.getSpaceContent;

const content = json;
</script>

<style lang="scss" scoped>
.honeydew-stage {
  max-width: 65em;
  padding: 0;
}
</style>
