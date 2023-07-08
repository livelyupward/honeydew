<template>
  <div id="honeydew-space" v-if="spaceAndContent">
    <SpaceTitle :title="spaceTitle" />
    <SpaceStage />
  </div>
  <p v-else>Loading space...</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mainStore } from '../store.ts';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import SpaceTitle from '../fragments/Stage/SpaceTitle.vue';
import SpaceStage from '../fragments/Stage/SpaceStage.vue';
const store = mainStore();
const { userGetter } = storeToRefs(store);
const { getSpaceAndContent, setActiveSpace } = store;

const route = useRoute();
const spaceAndContent = ref(await getSpaceAndContent(route.params.id));
const spaceTitle = spaceAndContent.title ? spaceAndContent.title : 'Create a space!';

watchEffect(async () => {
  if (userGetter.value?.activeSpace !== route.params.id) {
    // @ts-ignore
    await setActiveSpace(route.params.id);
  }
  spaceAndContent.value = await getSpaceAndContent(route.params.id);
});
</script>

<style lang="scss">
#honeydew-space {
  padding: 1.375rem;

  .honeydew-space_heading {
    color: #e1e1e1;
    font-size: 2.875rem;
    font-weight: 900;
    margin: 0 30px 1rem;
  }
}
</style>
