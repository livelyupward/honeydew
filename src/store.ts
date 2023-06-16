import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      spaceContent: [],
    };
  },
  getters: {
    getSpaceContent(state) {
      return state.spaceContent;
    },
  },
  actions: {
    addNewItemToContent(newContentObj: HoneydewItem): void {
      this.spaceContent.push(newContentObj);
    },
  },
});

export interface State {
  spaceContent: HoneydewItem[];
}

export interface HoneydewItem {
  type: string;
  text: string;
  items?: [] | object;
}
