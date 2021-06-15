import "../styles/index.css";
import router from "./helpers/router";

const app = {
  currencyList: ["BTC/EUR", "ETH/EUR", "DOGE/EUR", "SHIB/EUR", "LTC/EUR"],
  interval: "1d",
  init() {
    document.addEventListener("DOMContentLoaded", app.load);
    window.addEventListener("popstate", app.load);
  },

  load() {
    // app.showLoading()
    router(app.currencyList, app.interval);
  },

  showLoading() {
    // loading spinner
  },
};

app.init();
