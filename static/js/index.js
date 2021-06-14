import "../styles/index.css";
import router from "./helpers/router";

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
