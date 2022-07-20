import { defineStore } from 'pinia';
import axios from 'axios';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      creatingItem: false,
      todosLoading: true,
      todoLists: [
        {
          listTitle: 'My Current List',
          todos: [
            {
              title: 'This is my first todo',
              comments: [
                {
                  commentTitle: "I'm a comment",
                },
              ],
              complete: false,
              dueDate: '2/12/2022',
            },
            {
              title: 'Here is my second',
              comments: [
                {
                  commentTitle: "I'm another comment",
                },
              ],
              complete: false,
              dueDate: null,
            },
          ],
        },
      ],
    };
  },

  getters: {
    getUserListsFromDb(state) {
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
      axios
        .post(`http://localhost:4000`, payload)
        .then((response) => {
          console.log('API Response:: ', response);
        })
        .catch((error) => console.log('Error:: ', error));
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
  },
});
