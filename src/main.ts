import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import MingPro from "ming-pro";
import "ming-pro/lib/style.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router"
import store from "./store";
import "./assets/style/common.scss"

let app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`icon-${toLine(key)}`, component);
}
function toLine(value:string) {
    return value.replace(/(A-Z)g/, "-$1").toLowerCase();
}
app.use(ElementPlus);
app.use(MingPro);
app.use(router);
app.use(store);

app.mount("#app");
