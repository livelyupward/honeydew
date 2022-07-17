<template>
  <Title :title-text="title" />
  <SignIn />
  <!--  <Main />-->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Title from './components/Title.vue';
import Main from './components/Main.vue';
import SignIn from './components/SignIn.vue';
import axios from 'axios';

const title = ref(null);
</script>

<style lang="scss">
html,
body {
  background-color: #639;
  color: #fff;
  margin: 0;
  padding: 0;
}

button {
  cursor: pointer;
  font-family: 'Lato', sans-serif;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  padding: 0 15px 0;
  text-align: center;
}
</style>
