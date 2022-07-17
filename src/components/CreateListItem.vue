<template>
  <form @submit.prevent="addListItem()" class="honeydew-list_create-form">
    <p>Create new list item</p>
    <div class="honeydew-list_form-group">
      <label for="create-text">Item Text</label>
      <input id="create-text" v-model="todoTitle" type="text" required />
    </div>
    <div class="honeydew-list_form-group">
      <label for="create-text">Due Date</label>
      <datepicker v-model="todoDueDate" :clearable="true" />
    </div>
    <div class="honeydew-button_group">
      <button>Save New Item</button>
      <button @click.prevent="cancelCreate">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { mainStore } from '../store';
import Datepicker from 'vue3-datepicker';
import axios from 'axios';

const todoTitle = ref('');
const todoDueDate = ref(new Date());

const store = mainStore();

function addListItem() {
  store.addTodoItem({
    title: todoTitle.value,
    dueDate: todoDueDate.value,
  });
  todoTitle.value = '';
  todoDueDate.value = new Date();
  axios.put('http://localhost:4000/list/make', { ...store.todoListToAdd }).then((response) => {
    store.deactivateCreateItem();
    console.log('RES: ', response);
  });
}

function cancelCreate() {
  store.cancelCreateItem();
}

onMounted(() => {
  console.log('Datepicker initialized');
});
</script>

<style lang="scss" scoped>
.honeydew-list_create-form {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  margin: 15px 0;

  label {
    display: block;
    text-align: left;
  }

  input[type='text'] {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #333;
    border-radius: 5px;
    color: #333;
    font-size: 18px;
    padding: 4px;
  }
}
</style>
