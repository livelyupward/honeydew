import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      creatingItem: false,
      todosLoading: true,
      userAuth: null,
      userData: null,
    };
  },

  getters: {
    getUserFromDb(state) {
      return state.userData;
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
    addTodoItem(postPayload) {
      const { title, dueDate, complete, comments } = postPayload;

      this.userData[postPayload.listIndex].todos.push({
        title,
        dueDate,
        complete,
        comments,
      });
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
    deactivateCreateItem() {
      this.creatingItem = false;
    },
    loginUser(jwtPayload) {
      jwtPayload ? (this.userAuth = { ...jwtPayload }) : console.log('Error decoding JWT string');
    },
    setUserLists(payload) {
      this.userData = payload;
    },
  },
});
