import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import vue3GoogleLogin from 'vue3-google-login';
import { router } from './router.ts';
import { createPinia } from 'pinia';
import Popper from 'vue3-popper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faGripLines, faLayerGroup, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faHoneyPot } from '@fortawesome/pro-solid-svg-icons';
// import { faSort } from '@fortawesome/pro-regular-svg-icons';
import { faSort, faListTimeline, faCaretRight } from '@fortawesome/pro-light-svg-icons';

library.add(
  faPlus,
  faGripLines,
  faLayerGroup,
  faXmark,
  faCaretRight,
  faCalendarDays,
  faBell,
  faHoneyPot,
  faSort,
  faListTimeline
);

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENTID,
  })
  .component('Popper', Popper)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(pinia)
  .mount('#app');
