import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
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
  .use(vue3GoogleLogin, {
    clientId:
      "341685135952-qr8o9jbdimsjfq1gd8rcc128rlj5kb09.apps.googleusercontent.com",
  })
  .mount("#app");
