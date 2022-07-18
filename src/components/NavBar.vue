<template>
  <header class="honeydew-header">
    <h1 class="honeydew-title">{{ titleText ? titleText : 'honeydew' }}</h1>
    <div class="honeydew-auth">
      <div v-if="store.userAuthInfo" class="honeydew-auth success">
        <div class="honeydew-auth_user">
          <span class="honeydew-auth_name">{{ store.userAuthInfo.given_name }}</span>
          <span class="honeydew-auth_avatar" v-html="store.userAuthInfo.avatar"></span>
        </div>
      </div>
      <div v-else class="honeydew-auth guest">
        <button>Login</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue';
import { mainStore } from '@/store';

const store = mainStore();

defineProps({
  titleText: String,
});
</script>

<style lang="scss" scoped>
.honeydew-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.honeydew-title {
  font-family: 'Maven Pro', sans-serif;
  font-size: 48px;
  margin: 5px 0 15px;
}

.honeydew-auth_user {
  align-items: center;
  display: flex;

  .honeydew-auth_name {
    margin-right: 10px;
  }
}
</style>
