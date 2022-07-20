<template>
  <main class="two-due_main" v-if="todoLists">
    <TodoList v-for="list in todoLists" :list="list" />
  </main>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { mainStore } from '../store';
import TodoList from './TodoList.vue';
import axios from 'axios';

const store = mainStore();
const todoLists = reactive(store.getUserListsFromDb);

onMounted(() => {
  console.log('App initialized');
  axios
    .get('http://localhost:4000')
    .then((response) => {
      console.log('RES:: ', response);
    })
    .catch((err) => console.log('Error:: ', err));
});
</script>

<style lang="scss" scoped>
.two-due_main {
  margin: 0 auto;
  max-width: 700px;
  min-width: 300px;
  width: 100%;
}
</style>
