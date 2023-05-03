import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      message: '',
    };
  },
  actions: {
    sayHello() {
      return 'Hello!';
    },
  },
});
