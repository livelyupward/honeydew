import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      creatingItem: false,
      listItemToAdd: null,
      todosLoading: true,
      todoLists: [],
      todoListToAdd: null,
    };
  },

  getters: {
    getTodoLists(state) {
      return state.todoLists;
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
    addListItem(payload) {
      this.todoLists = payload;
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
    setUserLists(payload) {
      this.todoLists = payload;
    },
  },
});
