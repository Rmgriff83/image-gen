import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

//Pinia
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(vuetify);

app.mount("#app");
