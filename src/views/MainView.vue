<template>
  <Suspense>
    <main class="honeydew-main" v-if="store.getUserListsFromDb">
      <TodoList
        v-for="listAndTodos in store.getUserListsFromDb"
        :listAndTodos="listAndTodos"
        :key="listAndTodos.list.id"
      />
      <button
        class="honeydew-form_button perpetual-create"
        @click="createNewList"
      >
        Create a list
      </button>
      <form
        class="honeydew-main_create-form"
        @submit.prevent="submitNewList"
        v-if="creatingList"
      >
        <div class="honeydew-form_group">
          <label for="list-title">List Title</label>
          <input v-model="title" id="list-title" type="text" />
          <button class="honeydew-form_button block confirm">
            Save new list
          </button>
        </div>
        <div class="honeydew-form_group">
          <label for="list-category">List Category</label>
          <input v-model="category" id="list-category" type="text" />
          <button
            class="honeydew-form_button block cancel"
            v-if="creatingList"
            @click.prevent="cancelCreateList"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
    <main class="honeydew-main" v-else>
      <p class="honeydew-main_no-lists" v-if="!creatingList">No lists found.</p>
      <form
        class="honeydew-main_create-form"
        @submit.prevent="submitNewList"
        v-if="creatingList"
      >
        <div class="honeydew-form_group">
          <label for="list-title">List Title</label>
          <input v-model="title" id="list-title" type="text" />
          <button class="honeydew-form_button block confirm">
            Save new list
          </button>
        </div>
        <div class="honeydew-form_group">
          <label for="list-category">List Category</label>
          <input v-model="category" id="list-category" type="text" />
          <button
            class="honeydew-form_button block cancel"
            v-if="creatingList"
            @click.prevent="cancelCreateList"
          >
            Cancel
          </button>
        </div>
      </form>
      <button
        class="honeydew-form_button perpetual-create"
        @click="createNewList"
      >
        Create a list
      </button>
    </main>
  </Suspense>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { mainStore } from "../store";
import TodoList from "../components/TodoList.vue";
import axios from "axios";

const store = mainStore();
const creatingList = ref(false);
const title = ref("");
const category = ref("");

function createNewList() {
  creatingList.value = true;
}

function cancelCreateList() {
  creatingList.value = false;
}

function submitNewList() {
  axios
    .post("http://localhost:4000/lists", {
      title: title.value,
      category: category.value,
      user: store.userAuthInfo._id,
    })
    .then((response) => {
      setUserLists();
      creatingList.value = false;
      title.value = "";
      category.value = "";
      console.log("Create List Response: ", response);
    });
}

function setUserLists() {
  !store.getUserListsFromDb &&
    axios
      .get(`http://localhost:4000/lists/${store.userAuthInfo._id}/todos`)
      .then((response) => {
        store.setUserLists(response.data);

        return response.data;
      })
      .catch((err) => console.log("Error:: ", err));
}

onMounted(() => {
  setUserLists();
});
</script>

<style lang="scss">
.honeydew-main {
  margin: 30px auto 0;
  max-width: 700px;
  min-width: 300px;
  width: 100%;

  .honeydew-main_no-lists {
    font-size: 18px;
  }
}

.honeydew-main_create-form,
.honeydew-list_create-form {
  display: grid;
  grid-template-columns: auto auto;

  .honeydew-form_group {
    padding: 15px;
    text-align: left;

    input {
      box-sizing: border-box;
      margin-bottom: 10px;
      width: 100%;
    }
  }
}

.honeydew-form_button {
  &.block {
    width: 100%;
  }

  &.confirm {
    background-color: #fff;
    border-color: #fff;
  }

  &.cancel {
    background-color: #333;
    border-color: #333;
    color: #fff;
  }
}
</style>
