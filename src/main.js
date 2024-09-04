import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index-router";

import { firebaseAuth } from "@/configs/firebase";
import { importGlobalComponent } from "@/utilities/import";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import "@/assets/styles/scss/bootstrap-custom.scss";
import "@/assets/styles/scss/global.scss";

let app;

firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);

    importGlobalComponent(app);

    app.mount("#app");
  }
});
