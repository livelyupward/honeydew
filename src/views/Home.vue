<template>
  <div id="app-container">
    <Sidebar />
    <main class="honeydew_main-container">
      <h1>We are testing here.</h1>
      <TodoList :content="{ ...list }" />
      <hr />
      <KanbanBoard :content="kanban" />
      <hr />
      <AnyNote />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../fragments/Sidebar/Sidebar.vue';
import TodoList from '../fragments/Todo/TodoList.vue';
import KanbanBoard from '../fragments/Kanban/KanbanBoard.vue';
import AnyNote from '../fragments/note/AnyNote.vue';
import { mainStore } from '../store.ts';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { kanban } = storeToRefs(store);

const list = {
  title: 'My first list',
  items: [
    {
      value: false,
      content: 'hello friends',
      type: 'strikeable',
    },
    {
      value: false,
      content: 'my second list item',
      type: 'strikeable',
    },
    {
      value: false,
      content: 'another list item',
      type: 'strikeable',
    },
  ],
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}

#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100vh;
}

main.honeydew_main-container {
  overflow-y: auto;
  padding: 1.25rem;
}
</style>
