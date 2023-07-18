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
  const { getUser } = store;
  const { userGetter } = storeToRefs(store);

  if (!userGetter.value) {
    import.meta.env.VITE_DEBUG === 'true' && console.log('No user in state');
    if (localStorage.getItem('honeydew_my_credential')) {
      const verifyToken = await fetch(`/api/auth/callback?cred=${localStorage.getItem('honeydew_my_credential')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!verifyToken.ok) {
        if (to.path !== '/auth') {
          return next('/auth');
        } else {
          return next();
        }
      } else {
        const tokenResponse = await verifyToken.json();

        await getUser(tokenResponse.email);
        return next();
      }
    } else {
      if (to.path !== '/auth') {
        return next('/auth');
      } else {
        return next();
      }
    }
  } else {
    return next();
  }
});
