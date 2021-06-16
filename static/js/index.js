import "../styles/index.css";
import router from "./helpers/router";
import { coinList } from "./data/coin-list";

export const app = {
  interval: "1d",
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      // initialise dropdown functionality in navbar
      const elements = document.querySelectorAll(".dropdown-trigger");
      const instances = M.Dropdown.init(elements);
      // load relevant route
      const currency = document.getElementById("selected-currency").textContent;
      app.load(currency);
    });
  },

  load(currency) {
    // app.showLoading()
    let list = coinList.map((coin) => coin + `/${currency}`);
    router(list, app.interval);
  },

  showLoading() {
    // loading spinner
  },
};

app.init();
