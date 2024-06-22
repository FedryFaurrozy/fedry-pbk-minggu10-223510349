import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import "quasar/dist/quasar.css"; // Import Quasar's CSS
import "./index.sass"; // Import your custom SASS styles

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar);

app.mount("#app");
