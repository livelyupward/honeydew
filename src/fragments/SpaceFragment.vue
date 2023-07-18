<template>
  <div class="honeydew-space_item">
    <div class="honeydew-space_item-sort" ref="handle">
      <font-awesome-icon :icon="['fal', 'sort']" />
    </div>
    <div
      class="honeydew-space_content-item"
      ref="fragmentContent"
      contenteditable="true"
      @keydown.enter="submitEditedFragment"
    >
      <slot></slot>
    </div>
    <div class="honeydew-space_item-convert">
      <Popper>
        <font-awesome-icon :icon="['fal', 'list-timeline']" />
        <template #content>
          <ul>
            <li>Note</li>
            <li>Kanban</li>
            <li>Todo</li>
          </ul>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { mainStore, type ContentItem } from '../store.ts';
import { storeToRefs } from 'pinia';
const store = mainStore();
const { editContentItem } = store;

const fragmentContent: Ref<HTMLElement|null> = ref(null);

const props = defineProps<{
  contentItem: ContentItem;
}>();

async function submitEditedFragment(event) {
  event.preventDefault();

  const spaceItem = event.target;
  console.log(spaceItem);

  spaceItem.classList.add('submitted');
  setTimeout(() => {
    spaceItem.classList.remove('submitted');
  }, 550);

  let textContentWorkaround = '';

  if ('textContent' in fragmentContent.value && fragmentContent.value !== null) {
    textContentWorkaround = fragmentContent.value.textContent;
  } else {
    throw new Error('Fragment content is null. Cannot complete submission.');
  }

  const newContentRequest = await editContentItem({ ...props.contentItem, text: textContentWorkaround });

  return newContentRequest;
}
</script>

<style lang="scss">
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: inherit;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radiu: 6px;
  --popper-theme-padding: 1rem;
  --popper-theme-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.02), 1px 1px 2px rgba(0, 0, 0, 0.14);
}

.honeydew-space_item {
  @include round;
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  .honeydew-space_item-sort,
  .honeydew-space_item-nosort,
  .honeydew-space_item-convert {
    align-items: center;
    cursor: pointer;
    display: none;
    flex: 0 0 30px;
    justify-content: center;
  }

  .honeydew-space_item-nosort {
    cursor: auto;
    visibility: hidden;
  }

  .honeydew-space_content-item {
    flex: 0 0 calc(100% - 66px);
    position: relative;

    &:empty {
      &::before {
        color: #ababab;
        content: 'Type here for a new note';
        cursor: text;
        display: block;
        margin-top: 1px;
        position: absolute;
      }
    }

    &.hovered {
      margin-top: 20px;
    }

    &.submitted {
      animation: {
        name: succeed;
        duration: 0.5s;
        timing-function: ease-in;
      }
    }
  }

  &:hover {
    .honeydew-space_item-sort,
    .honeydew-space_item-nosort,
    .honeydew-space_item-convert {
      border-color: #888;
      display: flex;
    }

    .honeydew-space_item-sort,
    .honeydew-space_item-convert {
      @include round;
      @include shadow-sm;
      background-color: $black;
      color: #fff;
    }

    .honeydew-space_content-item {
      margin: 0;
    }

    &:not(.new) {
      .honeydew-space_content-item {
        border-radius: 0;
      }
    }
  }
}

.honeydew-space_content-item {
  @include shadow-sm;
  @include round;
  background-color: $black;
  color: $white;
  margin: 0 30px;
  padding: 3px 8px;
  position: relative;
}

.honeydew-space_content-item_actions {
  bottom: 0;
  left: 0;
  position: absolute;
  transform: translateY(calc(100% - 2px));

  .honeydew-space_content-item_actions-button {
    background-color: #fff;
    border: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 0.75rem;
    padding: 2px 6px;

    &:hover {
      background-color: darken(#fff, 5);
    }

    &:first-of-type {
      border-right: 1px solid #ddd;
    }
  }
}

@keyframes succeed {
  0% {
    background-color: rgba(129, 199, 132, 0);
  }

  50% {
    background-color: rgba(129, 199, 132, 0.25);
  }

  100% {
    background-color: rgba(129, 199, 132, 0);
  }
}
</style>
