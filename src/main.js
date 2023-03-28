import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "firebase/auth";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/library/Database";

import "bulma/css/bulma.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faEdit, faTimes);

let baseApp;

let auth = getAuth(FirebaseApp);

auth.onAuthStateChanged(() => {
  if (!baseApp) {
    const baseApp = createApp(App);
    baseApp.component("fa-icon", FontAwesomeIcon);
    baseApp.use(router);
    baseApp.use(store);
    baseApp.mount("#app");
  }
});
