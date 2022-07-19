<template>
  <Suspense>
    <div class="honeydew">
      <NavBar v-if="store.userAuthInfo" :title-text="title" />
      <SignIn v-if="!store.userAuthInfo" />
      <MainView v-else />
    </div>
  </Suspense>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { mainStore } from './store';
import NavBar from '@/components/NavBar';
import MainView from '@/components/MainView.vue';
import SignIn from '@/components/SignIn';
import { decodeCredential } from 'vue3-google-login';
import axios from 'axios';

const title = ref('');
const store = mainStore();

onMounted(() => {
  const userAuthCookie = window.localStorage.getItem('honeydew_auth_token');
  if (userAuthCookie) {
    const userInfo = decodeCredential(userAuthCookie);
    axios.get(`http://localhost:4000/users/${userInfo.email}`).then((response) => {
      store.loginUser({ ...userInfo, ...response.data });
    });
    console.log('UI:: ', userInfo);
  }
});
</script>

<style lang="scss">
html,
body {
  background-color: honeydew;
  color: #333;
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
  font-family: 'Lato', sans-serif;
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
  font-family: 'Lato', sans-serif;
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
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  text-align: center;
}
</style>
