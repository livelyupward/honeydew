<template>
  <section class="honeydew-list" v-if="listAndTodos">
    <ListTitle :list-title="listAndTodos.list.listTitle" />
    <ul v-if="listAndTodos.todos.length" class="honeydew-list_content">
      <ListItem
        v-for="todo in listAndTodos.todos"
        :todo="todo"
        :key="todo.id"
        @open-actions="activateActions"
      />
      <aside
        v-if="actionsActivated"
        class="honeydew-item_actions"
        :style="`top: ${menuStyles.top}px; left: ${menuStyles.left}px`"
      >
        <button>Edit</button>
        <button>Delete</button>
      </aside>
    </ul>
    <p v-else>No todos yet.</p>
    <CreateListItem v-if="creatingItem" :list-and-todos="listAndTodos" />
    <button
      class="honeydew-list_create"
      v-if="!creatingItem"
      @click="activateCreateItem"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
      <span class="honeydew-list_add">Add Item</span>
    </button>
  </section>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { mainStore } from "@/store";
import ListTitle from "./ListTitle.vue";
import ListItem from "./ListItem.vue";
import CreateListItem from "./CreateListItem.vue";

const store = mainStore();
const actionsActivated = ref(false);

defineEmits(["openActions"]);

defineProps({
  listAndTodos: Object,
});

const menuStyles = ref({
  top: "0px",
  left: "0px",
});

function activateActions(target) {
  const listItemElement = target.$el;
  const listItemPosition = listItemElement.getBoundingClientRect();

  menuStyles.value.top = listItemPosition.top;
  menuStyles.value.left = listItemPosition.left;
  actionsActivated.value = true;
}

const creatingItem = computed(() => store.isCreatingItem);

function activateCreateItem() {
  store.activateCreateItem();
}
</script>

<style lang="scss" scoped>
.honeydew-list_title {
  font-family: "Maven Pro", sans-serif;
  margin-bottom: 10px;
  text-align: left;
}

.honeydew-list {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13);
  list-style-type: none;
  margin: 0 15px 15px;
  padding: 15px 15px 0;

  &_content {
    margin-bottom: 0;
    position: relative;
  }

  .honeydew-list_create-form {
    .honeydew-list_form-group {
      input {
        width: 100%;
      }
    }
  }
}

.honeydew-list_create {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: none;
  color: #333;
  display: block;
  font-size: 18px;
  padding: 15px;
  width: 100%;

  svg {
    margin-right: 5px;
  }
}

.honeydew-item_actions {
  position: absolute;
}
</style>
