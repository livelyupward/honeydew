<template>
  <Suspense>
    <main class="honeydew-main" v-if="userLists">
      <TodoList v-for="list in userLists" :list="list" :key="list.id" />
    </main>
    <main class="honeydew-main" v-else>You have not yet created a list.</main>
  </Suspense>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { mainStore } from "../store";
import TodoList from "./TodoList.vue";
import axios from "axios";

const store = mainStore();

const userLists = ref(null);

onMounted(() => {
  console.log("App initialized");
  axios
    .get("http://localhost:4000/lists")
    .then((response) => {
      store.setUserLists(response.data);

      return response.data;
    })
    .then((data) => {
      userLists.value = data;
    })
    .catch((err) => console.log("Error:: ", err));
});
</script>

<style lang="scss" scoped>
.honeydew-main {
  margin: 0 auto;
  max-width: 700px;
  min-width: 300px;
  padding: 0 15px 0;
  width: 100%;
}
</style>
