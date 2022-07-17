import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear, faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const store = createPinia();
const app = createApp(App);

library.add(faGear, faEllipsis, faPlus, faGoogle);

app.use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
