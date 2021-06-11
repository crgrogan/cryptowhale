import { getTicker, getCandlestick } from "./helpers/data-service.js";

const app = {
  currency: "BTCUSDT",
  interval: "1d",

  init() {
    document.addEventListener("DOMContentLoaded", app.load);
  },
  load() {
    // app.showLoading()
    app.getData();
  },
  showLoading() {
    // loading spinner
  },
  getData() {
    getTicker(this.currency);
    getCandlestick(this.currency, this.interval);
  },
};
app.init();
