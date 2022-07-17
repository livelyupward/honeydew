import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
// import router from "./router";
import { IonicVue } from "@ionic/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const store = createPinia();

library.add(faGear, faEllipsis, faPlus, faGoogle);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(IonicVue)
  .mount("#app");
