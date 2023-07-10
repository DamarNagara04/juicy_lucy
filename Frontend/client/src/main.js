import "./assets/main.css";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.use(vue3GoogleLogin, {
  clientId:
    "1066193754238-hh0b0pk3urqbm6rl4fvcpvcj0cb0c7oh.apps.googleusercontent.com",
});

app.mount("#app");
