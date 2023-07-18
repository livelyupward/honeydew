<template>
  <section class="honeydew-stage" v-if="getCurrentSpace.content.length">
    <Sortable :list="getCurrentSpace.content" item-key="id" @end="completeSorting" :group="stageGroup">
      <template #item="{ element, index }">
        <SpaceFragment :key="element.id" :content-item="element">
          {{ element.text }}
        </SpaceFragment>
      </template>
    </Sortable>
    <NewFragment />
  </section>
  <div class="honeydew-stage loading" v-else>
    <p>Loading space...</p>
  </div>
</template>

<script setup lang="ts">
import { Sortable } from 'sortablejs-vue3';
import SpaceFragment from '../SpaceFragment.vue';
import NewFragment from '../NewFragment.vue';
import { ContentItem, mainStore } from '../../store.ts';
import { storeToRefs } from 'pinia';
import { computed, ComputedRef, ref } from 'vue';

const stageGroup = {
  group: {
    name: 'stage',
    put: 'stage',
    pull: 'stage',
  },
};

const store = mainStore();
const { getCurrentSpace } = storeToRefs(store);
const { submitCurrentSpaceContent } = store;

// @ts-ignore
let mutableContent: ContentItem[] = getCurrentSpace.value.content;

const moveItemInArray = (array, from, to) => {
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
};

async function completeSorting(event) {
  moveItemInArray(mutableContent, event.oldIndex, event.newIndex);
  // @ts-ignore
  await submitCurrentSpaceContent({ ...getCurrentSpace.value, content: mutableContent });
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
