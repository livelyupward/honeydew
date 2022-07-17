import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      creatingItem: false,
      listItemToAdd: null,
      todosLoading: true,
      userData: null,
      todoListToAdd: {
        title: '',
        completed: false,
        dueDate: new Date(),
        comments: [],
      },
    };
  },

  getters: {
    getTodoLists(state) {
      return state.userData;
    },
    getItemToAdd(state) {
      return state.todoListToAdd;
    },
    isCreatingItem(state) {
      return state.creatingItem;
    },

    isFetchingTodos(state) {
      return state.todosLoading;
    },
  },

  actions: {
    activateCreateItem() {
      this.creatingItem = true;
    },
    addTodoItem() {
      console.log('todos: ', this.userData[0]);
      this.userData[0].todos.push(this.todoListToAdd);
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
    deactivateCreateItem() {
      this.creatingItem = false;
    },
    setUserLists(payload) {
      this.userData = payload;
    },
  },
});
