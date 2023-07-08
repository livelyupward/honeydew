<template>
  <section class="honeydew-stage">
    <Sortable v-if="mutableContent.length" :list="mutableContent" item-key="id" @end="completeSorting">
      <template #item="{ element, index }">
        <SpaceFragment :key="element.id">
          {{ element.text }}
        </SpaceFragment>
      </template>
    </Sortable>
    <NewFragment />
  </section>
</template>

<script setup lang="ts">
import { Sortable } from 'sortablejs-vue3';
import SpaceFragment from '../SpaceFragment.vue';
import NewFragment from '../NewFragment.vue';
import { mainStore } from '../../store.ts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = mainStore();
const { getSpaceContent } = storeToRefs(store);
const { submitCurrentSpaceContent } = store;

let mutableContent = computed(() => [...getSpaceContent.value.content]);

const moveItemInArray = (array, from, to) => {
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
};

async function completeSorting(event) {
  moveItemInArray(mutableContent.value, event.oldIndex, event.newIndex);
  await submitCurrentSpaceContent({ ...getSpaceContent.value, content: mutableContent.value });
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
