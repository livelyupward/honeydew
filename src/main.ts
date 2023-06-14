import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { router } from './router.ts';
import { createPinia } from 'pinia';
import Popper from 'vue3-popper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

const pinia = createPinia();

createApp(App)
  .use(router)
  .component('Popper', Popper)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(pinia)
  .mount('#app');
