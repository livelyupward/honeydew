<template>
  <GoogleLogin :callback="callback" prompt auto-login />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mainStore } from '../store.ts';
import { storeToRefs } from 'pinia';
const store = mainStore();
const { getUser } = store;
const { userGetter } = storeToRefs(store);

const router = useRouter();
const callback = async (response) => {
  let userEmail;

  const tokenSend = await fetch(`/api/auth/callback?cred=${response.credential}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!tokenSend.ok) throw new Error('Authentication was unsuccessful. Please login again.');
  const tokenResponse = await tokenSend.json();
  userEmail = tokenResponse.email;
  // Get user from honeydew db
  const getUserFromDb = await fetch(`/api/users/${tokenResponse.email}`);
  if (getUserFromDb.status === 404) {
    const registerUserRequest = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tokenResponse.name, email: tokenResponse.email }),
    });
    if (!registerUserRequest.ok) throw new Error('User account could not be created. Please try again.');
    const registerUserResponse = await registerUserRequest.json();
  }

  await getUser(userEmail);
  localStorage.setItem('honeydew_my_credential', response.credential);
  // use user details retrieved from db to send to active space
  userGetter.activeSpace ? await router.push(`/spaces/${userGetter.activeSpace}`) : await router.push('/');
};
</script>

<style lang="scss" scoped></style>
