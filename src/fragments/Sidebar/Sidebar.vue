<template>
  <aside id="honeydew-sidebar">
    <header class="honeydew-sidebar_links honeydew-sidebar_container">
      <div class="honeydew-sidebar_spaces" v-if="userSpaces">
        <SidebarHeading>
          <span class="honeydew-sidebar_spaces-heading">
            <font-awesome-icon :icon="['fas', 'honey-pot']" />
            Spaces
          </span>
          <button class="honeydew-sidebar_create-space-button" @click="activateCreateSpace" v-if="!creatingSpace">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
          <button class="honeydew-sidebar_create-space-button" @click="deactivateCreateSpace" v-else>
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </SidebarHeading>
        <ul class="honeydew-sidebar_links-list" v-if="userSpacesGetter">
          <Sortable
            :list="userSpacesGetter"
            item-key="id"
            @drop="droppedSpaceItem"
            @end.prevent="logEvent"
            :group="sidebarGroup"
          >
            <template #item="{ element, index }">
              <li class="honeydew-sidebar_link" @click="selectedLink = element.title" :data-space-id="element._id">
                <router-link v-slot="{ isActive }" :to="`/spaces/${element._id}`">
                  <font-awesome-icon
                    class="honeydew-sidebar_link-active-icon"
                    :icon="['fal', 'caret-right']"
                    v-if="isActive"
                  />
                  {{ element.title }}
                </router-link>
              </li>
            </template>
          </Sortable>
          <Transition name="slide-up">
            <li v-show="creatingSpace">
              <form @submit.prevent="callToCreateSpace">
                <label for="newSpaceName">New space title:</label>
                <input ref="createSpaceInput" v-model="spaceTitle" id="newSpaceName" type="text" />
              </form>
            </li>
          </Transition>
        </ul>
      </div>
    </header>
    <header class="honeydew-sidebar_quick-items">
      <ul class="honeydew-sidebar_quick-items_list">
        <li class="honeydew-sidebar_quick-items_list-link"></li>
      </ul>
    </header>
  </aside>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import SidebarHeading from './SidebarHeading.vue';
import { Sortable } from 'sortablejs-vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mainStore } from '../../store.ts';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = mainStore();
const { getUserSpaces, createSpace } = store;
const { userSpaces, userSpacesGetter } = storeToRefs(store);

const selectedLink = ref('');
const creatingSpace = ref(false);
const spaceTitle = ref('');
const createSpaceInput = ref(null);

const sidebarGroup = {
  group: {
    name: 'sidebar',
    put: 'stage',
    pull: null,
  },
};

await getUserSpaces();

async function activateCreateSpace() {
  creatingSpace.value = true;
  await nextTick();
  createSpaceInput.value.focus();
}

function deactivateCreateSpace() {
  creatingSpace.value = false;
  spaceTitle.value = '';
}
// function calling store create space
async function callToCreateSpace() {
  const newSpace = await createSpace(spaceTitle.value);

  creatingSpace.value = false;
  spaceTitle.value = '';

  await router.push(`/spaces/${newSpace._id}`);
}

function droppedSpaceItem(event) {
  const spaceToDropTo = event.target.parentNode.dataset.spaceId;
  const itemToTransfer = event;
}

function logEvent(event) {
  if (event.item.classList.contains('honeydew-space_item')) {
    console.log('tis an added space item');
  } else if (event.item.classList.contains('honeydew-sidebar_link')) {
    console.log('tis a space sort');
  }
}
</script>

<style lang="scss" scoped>
#honeydew-sidebar {
  background-color: #434343;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .honeydew-sidebar_spaces-heading {
    align-items: center;
    display: flex;
    font-size: 1.5rem;

    svg {
      font-size: 1.5rem;
      margin-right: 8px;
    }
  }

  .honeydew-sidebar_link {
    &:not(:first-of-type) {
      margin: 0.125rem 0;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .router-link-active {
    font-weight: 700;
    position: relative;

    .honeydew-sidebar_link-active-icon {
      left: -12px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .honeydew-sidebar_container {
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
  }
}

header {
  ul {
    margin-bottom: 1rem;
    padding: 0;
  }
}

.honeydew-sidebar_heading {
  align-items: center;
  display: flex;
  margin-top: auto;

  span {
    color: #e1e1e1;
    margin-right: auto;
  }

  button {
    color: #e1e1e1;
  }
}

.honeydew-sidebar_user-container {
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
}

.honeydew-sidebar_spaces-header {
  font-weight: 700;
}

.honeydew-sidebar_create-space-button {
  background-color: $transparent;
  border: none;
  box-shadow: none;
}

/* rules that target nested elements */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

/* ... other necessary CSS omitted */
</style>
