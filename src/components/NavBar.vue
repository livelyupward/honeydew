<template>
  <nav class="honeydew-header">
    <h1 class="honeydew-title">{{ titleText ? titleText : 'honeydew' }}</h1>
    <div class="honeydew-auth">
      <div v-if="store.userAuthInfo" class="honeydew-auth success">
        <a @click.prevent="actionsOpened = !actionsOpened" class="honeydew-auth_user">
          <span class="honeydew-auth_name">{{ store.userAuthInfo.given_name }}</span>
          <span class="honeydew-auth_avatar" v-html="store.userAuthInfo.avatar"></span>
        </a>
        <div v-if="actionsOpened" class="honeydew-auth_user-actions">
          <router-link to="/settings">Settings</router-link>
          <button class="honeydew-auth_user-logout" @click="logout">
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />Logout
          </button>
        </div>
      </div>
      <div v-else class="honeydew-auth guest">
        <button>Login</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { mainStore } from '@/store';

const store = mainStore();
const actionsOpened = ref<boolean>(false);

const logout = (): void => {
  store.logoutUser();
};

defineProps({
  titleText: String,
});
</script>

<style lang="scss" scoped>
.honeydew-header {
  align-items: center;
  background-color: #333;
  color: honeydew;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.honeydew-auth {
  position: relative;

  .honeydew-auth_user-logout {
    align-items: center;
    display: flex;
  }
}

.honeydew-auth_user {
  cursor: pointer;
}

.honeydew-auth_user-actions {
  bottom: 0;
  position: absolute;
  right: 0;
  transform: translateY(110%);
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
