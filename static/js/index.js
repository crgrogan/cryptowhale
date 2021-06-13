import router from "./helpers/router.js";

const app = {
  init() {
    document.addEventListener("DOMContentLoaded", app.load);
    window.addEventListener("popstate", app.load);
  },

  load() {
    // app.showLoading()
    router();
  },

  showLoading() {
    // loading spinner
  },
};

app.init();
