import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state() {
    return {
      creatingItem: false,
      todosLoading: true,
      userAuth: null,
      userData: null,
    };
  },

  getters: {
    getUserListsFromDb(state: State) {
      return state.userData;
    },
    isCreatingItem(state: State) {
      return state.creatingItem;
    },
    isFetchingTodos(state: State) {
      return state.todosLoading;
    },
    userAuthInfo(state: State) {
      return state.userAuth;
    },
  },

  actions: {
    activateCreateItem() {
      this.creatingItem = true;
    },
    cancelCreateItem() {
      this.creatingItem = false;
    },
    deactivateCreateItem() {
      this.creatingItem = false;
    },
    loginUser(jwtPayload: any) {
      jwtPayload
        ? (this.userAuth = { ...jwtPayload })
        : console.log("Error decoding JWT string");
    },
    logoutUser() {
      window.localStorage.removeItem("honeydew_auth_token");
      this.userAuth = null;
    },
    setUserLists(payload: [UserData]) {
      this.userData = payload;
    },
  },
});

interface UserAuth {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
  _id: string;
  avatar: string;
}

interface UserData {
  list: List;
  todos: [Todo];
}

interface Todo {
  _id: string;
  complete: boolean;
  dueDate?: string;
  list: string;
  text: string;
}

interface List {
  _id: string;
  category: string;
  listTitle: string;
  user: string;
}

interface State {
  creatingItem: boolean;
  todosLoading: boolean;
  userAuth: UserAuth | null;
  userData: [UserData] | null;
}

interface Getters {
  getUserListsFromDb: State["userData"];
  isCreatingItem: State["creatingItem"];
  isFetchingTodos: State["todosLoading"];
  userAuthInfo: State["userAuth"];
}

interface Actions {
  activateCreateItem: void;
  cancelCreateItem: void;
  deactivateCreateItem: void;
  loginUser: void;
  logoutUser: void;
  setUserLists: void;
}
