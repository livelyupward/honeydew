<template>
  <AppTitle :title-text="title" />
  <SignIn v-if="!authorized" />
  <MainView v-else />
</template>

<script setup>
import { defineComponent, ref } from "vue";
import AppTitle from "@/components/AppTitle";
import MainView from "@/components/MainView.vue";
import SignIn from "@/components/SignIn";
// import axios from "axios";

const title = ref("");
const authorized = ref(true);

defineComponent({
  components: { AppTitle, MainView, SignIn },
});
</script>

<style lang="scss">
html,
body {
  background-color: #639;
  background-color: honeydew;
  color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
}

input {
  font-family: "Lato", sans-serif;
}

button {
  cursor: pointer;
  font-family: "Lato", sans-serif;
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
  font-family: "Lato", sans-serif;
  text-align: center;
}
</style>
