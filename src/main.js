import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueI18n from "vue-i18n";
import i18n from "./i18n.js";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueI18n);

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
