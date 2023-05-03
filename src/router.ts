import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/components',
    component: () => import('./views/ComponentDisplay.vue'),
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
