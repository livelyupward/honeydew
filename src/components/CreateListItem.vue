<template>
  <p>Create new list item</p>
  <form @submit.prevent="addListItem()" class="honeydew-list_create-form">
    <div class="honeydew-list_form-group">
      <label class="honeydew-paper" for="create-text">Item Text</label>
      <input class="honeydew-paper" id="create-text" v-model="todoTitle" type="text" required />
    </div>
    <div class="honeydew-list_form-group">
      <label for="create-text">Due Date</label>
      <datepicker class="honeydew-list_form-datepicker" v-model="todoDueDate" :clearable="true" />
    </div>
    <div class="honeydew-button_group">
      <button class="honeydew-button confirm">Save New Item</button>
    </div>
    <div class="honeydew-button_group">
      <button class="honeydew-button cancel" @click.prevent="cancelCreate">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { mainStore } from '@/store';
import Datepicker from 'vue3-datepicker';
import axios from 'axios';

const props = defineProps({
  listAndTodos: Object,
});

const todoTitle = ref('');
const todoDueDate = ref(new Date());

const store = mainStore();

function addListItem() {
  const dateFormatted = todoDueDate.value.toLocaleDateString();

  axios
    .post(`http://localhost:4000/todos/${props.listAndTodos.list._id}/update`, {
      title: todoTitle.value,
      dueDate: dateFormatted,
    })
    .then((response) => {
      store.addTodoItem({
        title: todoTitle.value,
        dueDate: dateFormatted,
        comments: [],
        complete: false,
        listIndex: props.list.listIndex,
      });
      todoTitle.value = '';
      todoDueDate.value = new Date();
      store.deactivateCreateItem();
      console.log('RES: ', response);
    });
}

function cancelCreate() {
  store.cancelCreateItem();
}
</script>

<style lang="scss" scoped>
.honeydew-list_create-form {
  display: grid;
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  grid-template-rows: auto auto;
  grid-gap: 10px;
  margin: 15px 0;
  text-align: left;

  input {
    box-sizing: border-box;
    color: #333;
    padding: 4px;
    width: 100%;
  }

  button {
    width: 100%;

    &.cancel {
      background-color: #333;
      border-color: #333;
      color: #fff;
    }
  }
}
</style>

<style lang="scss">
.honeydew-list_form-datepicker {
  box-sizing: border-box;
  width: 100%;
}
.v3dp__clearable {
  display: inline;
  left: auto;
  position: absolute;
  right: 8px;
  cursor: pointer;
}
</style>
