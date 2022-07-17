<template>
  <article class="honeydew-list" v-if="list">
    <ListTitle :list-title="list.listTitle" />
    <ul class="honeydew-list_content">
      <ListItem v-for="todo in list.todos" :todo="todo" />
      <CreateListItem v-if="creatingItem" />
      <button
        class="honeydew-list_create"
        v-if="!creatingItem"
        @click="activateCreatItem"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        <span class="honeydew-list_add">Add Item</span>
      </button>
    </ul>
  </article>
</template>

<script setup>
import { ref, computed } from "vue";
import { mainStore } from "../store";
import ListTitle from "./ListTitle.vue";
import ListItem from "./ListItem.vue";
import CreateListItem from "./CreateListItem.vue";

const store = mainStore();
defineProps({
  list: Object,
});

const creatingItem = computed(() => store.isCreatingItem);

function activateCreatItem() {
  store.activateCreateItem();
}
</script>

<style lang="scss" scoped>
.honeydew-list_title {
  font-family: "Maven Pro", sans-serif;
  margin-bottom: 10px;
  text-align: left;
}

.honeydew-list_content {
  border: 1px solid #fff;
  border-radius: 5px;
  list-style-type: none;
  margin-top: 0;
  padding: 15px 15px 0;
}

.honeydew-list_create {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #fff;
  display: block;
  font-size: 18px;
  padding: 15px;
  width: 100%;

  svg {
    margin-right: 5px;
  }
}
</style>
