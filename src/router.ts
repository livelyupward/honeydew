import { mainStore } from './store.ts';
import { storeToRefs } from 'pinia';
import { createWebHistory, createRouter, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
    // @ts-ignore
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const store = mainStore();
      const { userGetter } = storeToRefs(store);
      console.log('Enter');
      if (!userGetter.value) throw new Error('No user found before navigation. Please login.');

      if (userGetter.value.activeSpace) await router.push(`/spaces/${userGetter.value.activeSpace}`);

      next();
    },
  },
  {
    path: '/auth',
    component: () => import('./views/Auth.vue'),
  },
  {
    path: '/today',
    component: () => import('./views/Today.vue'),
  },
  {
    path: '/spaces/:id',
    component: () => import('./views/Space.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/errors/NotFound.vue'),
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

// @ts-ignore
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = mainStore();
  const { userGetter } = storeToRefs(store);
  console.log('hello?');
  if (!userGetter.value) {
    if (to.path !== '/auth') {
      return next('/auth');
    } else {
      return next();
    }
  }
});
