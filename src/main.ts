import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import "./theme/variables.css";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faEllipsis,
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import component from "*.vue";

const store = createPinia();
const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(IonicVue)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId:
      "341685135952-qr8o9jbdimsjfq1gd8rcc128rlj5kb09.apps.googleusercontent.com",
  });

library.add(faGear, faEllipsis, faPlus, faGoogle, faArrowRightFromBracket);

router.isReady().then(() => {
  app.mount("#app");
});
