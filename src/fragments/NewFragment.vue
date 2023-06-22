<template>
  <div class="honeydew-space_item">
    <div class="honeydew-space_item-nosort">
      <font-awesome-icon :icon="['fas', 'grip-lines']" />
    </div>
    <div
      @keydown.enter="submitFragment"
      ref="fragmentContent"
      class="honeydew-space_content-item"
      contenteditable="true"
    ></div>
    <!--    <div class="honeydew-space_content-item_actions">-->
    <!--      <button class="honeydew-space_content-item_actions-button">-->
    <!--        <font-awesome-icon :icon="['far', 'calendar-days']" />-->
    <!--        Date-->
    <!--      </button>-->
    <!--      <button class="honeydew-space_content-item_actions-button">-->
    <!--        <font-awesome-icon :icon="['fas', 'bell']" />-->
    <!--        Remind-->
    <!--      </button>-->
    <!--    </div>-->
    <div class="honeydew-space_item-convert">
      <Popper>
        <font-awesome-icon :icon="['fas', 'layer-group']" />
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
import { ref } from 'vue';
import { mainStore } from '../store.ts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { fragmentMap } from '../fragmentMap.ts';

const store = mainStore();
const { createNewContentItem } = store;
const { userGetter } = storeToRefs(store);
const route = useRoute();

const fragmentContentTypes = Object.keys(fragmentMap);
const fragmentContent = ref(null);

async function submitFragment(event) {
  event.preventDefault();

  const newContentRequest = await createNewContentItem({
    text: fragmentContent.value.textContent,
    type: 'note',
    spaceId: typeof route.params === 'object' ? route.params.id[0] : route.params.id,
    userId: userGetter.value?._id,
  });

  console.log('Content: ', fragmentContent.value.textContent);
  fragmentContent.value.textContent = '';

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

  &.grabbed {
    opacity: 0;
  }

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  .honeydew-space_item-sort {
    border-right: 3px solid #efefef;
  }

  .honeydew-space_item-convert {
    border-left: 3px solid #efefef;
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
  }

  &:hover {
    //background-color: #fff;

    .honeydew-space_item-sort,
    .honeydew-space_item-nosort,
    .honeydew-space_item-convert {
      display: flex;
    }

    .honeydew-space_item-sort,
    .honeydew-space_item-convert {
      @include round;
      @include shadow-sm;
      background-color: #fff;
    }

    .honeydew-space_content-item {
      margin: 0;
    }
  }
}
.honeydew-space_content-item {
  @include shadow-sm;
  @include round;
  background-color: #fff;
  margin: 0 30px;
  padding: 3px 8px;
  position: relative;

  &.bottom-pad {
    padding-bottom: 20px;
  }

  &.top-pad {
    padding-top: 20px;
  }
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
</style>
