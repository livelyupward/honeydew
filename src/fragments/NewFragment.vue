<template>
  <div class="honeydew-space_item new">
    <div class="honeydew-space_item-nosort">
      <font-awesome-icon :icon="['fas', 'grip-lines']" />
    </div>
    <div
      @keydown.enter="submitNewFragment"
      ref="fragmentContent"
      class="honeydew-space_content-item"
      contenteditable="true"
    ></div>
    <div class="honeydew-space_item-convert">
      <Popper>
        <font-awesome-icon :icon="['fal', 'list-timeline']" />
        <template #content>
          <ul>
            <li v-for="type in fragmentContentTypes">{{ fragmentMap[type].name }}</li>
          </ul>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { mainStore } from '../store.ts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { fragmentMap } from '../fragmentMap.ts';

const store = mainStore();
const { createNewContentItem, addContentToSpace, launchFireworks, getSpaceAndContent } = store;
const { userGetter } = storeToRefs(store);
const route = useRoute();

const fragmentContentTypes = Object.keys(fragmentMap);
const fragmentContent: Ref<HTMLDivElement | null> = ref(null);

async function submitNewFragment(event) {
  event.preventDefault();

  // @ts-ignore
  const newContentRequest = await createNewContentItem({
    text: fragmentContent.value.textContent,
    type: 'note',
    spaceId: typeof route.params.id === 'string' ? route.params.id : route.params.id[0],
    userId: userGetter.value?._id,
  });
  // @ts-ignore
  fragmentContent.value.textContent = '';

  await addContentToSpace(newContentRequest.contentItem);
  await getSpaceAndContent(newContentRequest.contentItem.spaceId);

  await launchFireworks();
  return newContentRequest;
}
</script>

<style lang="scss">
.honeydew-space_item.new {
  margin-top: 0.5rem;
}
</style>
