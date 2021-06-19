import "../styles/index.css";
import router from "./helpers/router";
import data from "./data/data";
export const app = {
  interval: "1d",
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      // initialise dropdown functionality in navbar
      const elements = document.querySelectorAll(".dropdown-trigger");
      const instances = M.Dropdown.init(elements);
      // get saved currency option from local storage
      const currency = localStorage.getItem("currency") || data.defaultCurrency;
      document.getElementById("selected-currency").textContent = currency;
      // load relevant route
      app.load(currency);
    });
  },

  load(currency) {
    let list = data.coinList.map((coin) => coin + `/${currency}`);
    router(list, data.interval);
  },
};

app.init();
