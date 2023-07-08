<template>
  <div id="honeydew-space" v-if="spaceAndContent">
    <ConfettiExplosion
      v-if="getFireworksState"
      :stageHeight="1000"
      :particleSize="6"
      :force="0.2"
      :duration="2500"
      :colors="['#fff176', '#ec407a', '#5c6bc0', '#41BBC7']"
    />
    <SpaceTitle :title="spaceTitle" />
    <SpaceStage />
  </div>
  <p v-else>Loading space...</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mainStore } from '../store.ts';
import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import ConfettiExplosion from 'vue-confetti-explosion';
import SpaceTitle from '../fragments/Stage/SpaceTitle.vue';
import SpaceStage from '../fragments/Stage/SpaceStage.vue';
const store = mainStore();
const { userGetter, getFireworksState, getCurrentSpace } = storeToRefs(store);
const { getSpaceAndContent, setActiveSpace } = store;

const route = useRoute();
const spaceAndContent = ref(await getSpaceAndContent(route.params.id));
const spaceTitle = computed(() => {
  return getCurrentSpace.value ? getCurrentSpace.value.title : 'Create a space!';
});

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
  position: relative;

  .honeydew-space_heading {
    color: #e1e1e1;
    font-size: 2.875rem;
    font-weight: 900;
    margin: 0 30px 1rem;
  }

  .confetti-container {
    left: 50%;
    width: 100%;
  }
}
</style>
