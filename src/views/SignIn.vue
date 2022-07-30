<template>
  <section class="honeydew-signin">
    <h2>Login</h2>
    <GoogleLogin :callback="callback" />
  </section>
</template>

<script setup>
import { decodeCredential } from "vue3-google-login";
import { mainStore } from "../store";
import axios from "axios";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";

const store = mainStore();

const callback = (response) => {
  const googleCredential = response.credential;
  const userData = decodeCredential(googleCredential);

  let avatar = createAvatar(style, {
    seed: userData.name,
  });

  axios
    .post("http://localhost:4000/login", { ...userData, avatar })
    .then((response) => {
      console.log("RESSSSS:: ", response.data);
      store.loginUser({ ...userData, ...response.data });
      console.log("USER", userData);
      console.log("USER DATA from /login", response.data.avatar);
      window.localStorage.setItem("honeydew_auth_token", googleCredential);
    });
};
</script>

<style scoped></style>
