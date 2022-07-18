import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      creatingItem: false,
      todosLoading: true,
      userAuth: null,
      userData: [],
      listItemToAdd: {
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
      return state.listItemToAdd;
    },
    isCreatingItem(state) {
      return state.creatingItem;
    },
    isFetchingTodos(state) {
      return state.todosLoading;
    },
    userAuthInfo(state) {
      return state.userAuth;
    },
  },

  actions: {
    activateCreateItem() {
      this.creatingItem = true;
    },
    addTodoItem() {
      console.log('todos: ', this.userData);
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
    deactivateCreateItem() {
      this.creatingItem = false;
    },
    loginUser(jwtPayload) {
      console.log('type:: ', jwtPayload instanceof Object);
      jwtPayload ? (this.userAuth = { ...jwtPayload }) : console.log('Error decoding JWT string');
    },
    setUserLists(payload) {
      this.userData = payload;
    },
  },
});
