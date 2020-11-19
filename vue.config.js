module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "CNFURIKANA WEB";
      return args;
    });
  },

  pluginOptions: {
    i18n: {
      locale: "zh_CN",
      fallbackLocale: "en_US",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
