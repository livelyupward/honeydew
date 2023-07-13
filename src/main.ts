import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import vue3GoogleLogin from 'vue3-google-login';
import { router } from './router.ts';
import { createPinia } from 'pinia';
import Popper from 'vue3-popper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faGripLines, faLayerGroup, faXmark, faCaretRight, faBell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faHoneyPot } from '@fortawesome/pro-solid-svg-icons';

library.add(faPlus, faGripLines, faLayerGroup, faXmark, faCaretRight, faCalendarDays, faBell, faHoneyPot);

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: '341685135952-qr8o9jbdimsjfq1gd8rcc128rlj5kb09.apps.googleusercontent.com',
  })
  .component('Popper', Popper)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(pinia)
  .mount('#app');
