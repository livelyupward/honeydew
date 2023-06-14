import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      spaceContent: [
        {
          type: 'todo',
          title: 'My first list',
          items: [
            {
              complete: false,
              content: 'hello friends',
              type: 'strikeable',
            },
            {
              complete: false,
              content: 'my second list item',
              type: 'strikeable',
            },
            {
              complete: false,
              content: 'another list item',
              type: 'strikeable',
            },
          ],
        },
        {
          type: 'kanban',
          title: 'My kanban board',
          items: {
            Todo: [
              {
                content: 'Hello there',
              },
            ],
            Working: [
              {
                content: 'Wokring on it!',
              },
            ],
            Done: [
              {
                content: 'All done',
              },
            ],
          },
        },
      ],
    };
  },
  getters: {
    getSpaceContent(state) {
      return state.spaceContent;
    },
  },
  actions: {
    getDataForFragment(): void {},
  },
});
