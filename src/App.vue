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
    axios.get(`http://localhost:4000/user/${userInfo.email}`).then((response) => {
      store.loginUser({ ...userInfo, avatar: response.data.avatar });
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

input {
  font-family: 'Lato', sans-serif;
}

button {
  cursor: pointer;
  font-family: 'Lato', sans-serif;
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
  text-align: center;
}
</style>
