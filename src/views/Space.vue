<template>
  <div id="honeydew-space" v-if="spaceAndContent">
    <h1 class="honeydew-space_heading">{{ spaceAndContent.space.title }}</h1>
    <InteractiveStage />
  </div>
  <p v-else>Loading space...</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mainStore } from '../store.ts';
import InteractiveStage from '../fragments/Stage/InteractiveStage.vue';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
const store = mainStore();
const { userGetter } = storeToRefs(store);
const { getSpaceAndContent, setActiveSpace } = store;

const route = useRoute();
const spaceAndContent = ref(await getSpaceAndContent(route.params.id));

watchEffect(async () => {
  if (userGetter.value?.activeSpace !== route.params.id) {
    // @ts-ignore
    await setActiveSpace(route.params.id);
  }
  spaceAndContent.value = await getSpaceAndContent(route.params.id);
});
</script>

<style lang="scss" scoped>
#honeydew-space {
  padding: 1.375rem;

  .honeydew-space_heading {
    font-size: 2.875rem;
    font-weight: 900;
    margin: 0 30px 1rem;
  }
}
</style>
