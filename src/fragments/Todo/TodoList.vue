<template>
  <div class="todo-list_container">
    <p class="todo-list_title">{{ props.content.title }}</p>
    <ul class="todo-list_list">
      <li v-for="(listItem, index) in props.content.items" class="todo-list_list-item" :key="listItem">
        <TodoCheckable :key="index">
          {{ listItem.content }}
        </TodoCheckable>
      </li>
    </ul>
    <form @submit.prevent="addTodoItem">
      <input type="text" v-model="todoContent" />
      <button>Add Item</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoCheckable from './TodoCheckable.vue';

const todoContent = ref('');
const props = defineProps({
  content: Object,
});

const fragmentData = ref({ ...props.content });

function addTodoItem() {
  fragmentData.value.items.push({
    complete: false,
    content: todoContent.value,
    type: 'strikeable',
  });

  todoContent.value = '';
}
</script>

<style lang="scss" scoped>
.todo-list_list {
  padding: 0;
  margin: 10px 0;

  .todo-list_list-item {
    border-bottom: 1px solid #e1e1e1;
    margin: 10px 0 0;
    padding: 0 0 10px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
    }

    .todo-list_list-item_content {
      margin: 0;
    }
  }
}
</style>
