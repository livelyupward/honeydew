<template>
  <Suspense>
    <main class="honeydew-main" v-if="store.getTodoLists.length">
      <TodoList v-for="list in store.getTodoLists" :list="list" :key="list.id" />
    </main>
    <main class="honeydew-main" v-else>
      <p class="honeydew-main_no-lists">No lists found.</p>
      <form @submit.prevent="submitNewList" v-if="creatingList">
        <div class="honeydew-form_group">
          <label for="list-title">List Title:</label>
          <input v-model="newListTitle" id="list-title" type="text" />
        </div>
      </form>
      <button v-if="creatingList" @click="cancelCreateList">Cancel</button>
      <button v-else @click="createNewList">Create a list</button>
    </main>
  </Suspense>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { mainStore } from '../store';
import TodoList from './TodoList.vue';
import axios from 'axios';

const store = mainStore();
const creatingList = ref(false);
const newListTitle = ref('');

function createNewList() {
  creatingList.value = true;
  console.log("Let's go!");
}

function cancelCreateList() {
  creatingList.value = false;
  console.log('No go.');
}

function submitNewList() {
  console.log('New list!');
}

onMounted(() => {
  console.log('App initialized');
  axios
    .get(`http://localhost:4000/lists/${store.userAuthInfo.email}`)
    .then((response) => {
      console.log('RES1:: ', response.data);
      store.setUserLists(response.data);
      console.log('RES2:: ', response.data);

      return response.data;
    })
    .catch((err) => console.log('Error:: ', err));
});
</script>

<style lang="scss" scoped>
.honeydew-main {
  margin: 0 auto;
  max-width: 700px;
  min-width: 300px;
  width: 100%;
}
</style>
