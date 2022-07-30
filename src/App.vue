<template>
  <NavBar v-if="store.userAuthInfo" :title-text="title" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { mainStore } from "@/store";
import { onMounted, ref } from "vue";
import { decodeCredential } from "vue3-google-login";
import NavBar from "@/components/NavBar";
import axios from "axios";

let debug = false;
const store = mainStore();
const title = ref<string>("");

onMounted(() => {
  const userAuthCookie = window.localStorage.getItem("honeydew_auth_token");
  if (userAuthCookie) {
    const userInfo = decodeCredential(userAuthCookie);

    axios
      .get(`http://localhost:4000/users/${userInfo.email}`)
      .then((userResponse) => {
        debug && console.log("user find res:: ", userResponse.data);
        axios
          .get(`http://localhost:4000/lists/${userResponse.data._id}/todos`)
          .then((response) => {
            debug && console.log("user lists res:: ", response.data);
            store.loginUser({ ...userInfo, ...userResponse.data });
            store.setUserLists(response.data);
          });
      })
      .catch((userError) => {
        debug && console.log("axios userError:: ", userError);
      });
  }
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.honeydew-paper {
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
  color: #333;
  font-size: 16px;
}

input {
  @extend .honeydew-paper;
  font-family: "Lato", sans-serif;
  padding: 6px 8px;
}

label {
  @extend .honeydew-paper;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.06), 0 0px 2px rgba(0, 0, 0, 0.12);
  padding: 6px 8px;
  z-index: 10;
}

button {
  @extend .honeydew-paper;
  cursor: pointer;
  font-family: "Lato", sans-serif;
  padding: 6px 15px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

svg {
  border-radius: 50%;
  display: block;
  height: 30px;
  width: 30px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: honeydew;
  color: #333;
  display: flex;
  flex-direction: column;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  min-height: 100vh;
  text-align: center;
}
</style>
