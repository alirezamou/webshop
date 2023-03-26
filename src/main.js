import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bulma/css/bulma.css";

const app = createApp(App);

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";

library.add(faIcons);

app.component("fa-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
