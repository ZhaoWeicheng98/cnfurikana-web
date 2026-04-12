import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = import.meta.glob("./locales/*.json", { eager: true });
  const messages = {};
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i);
    if (matched && matched.length > 1) {
      messages[matched[1]] = locales[path].default || locales[path];
    }
  }
  return messages;
}

export default new VueI18n({
  locale: "zh_CN",
  fallbackLocale: "zh_CN",
  messages: loadLocaleMessages(),
});
