import { getCandlestick, getTicker } from "../helpers/data-service";
import AbstractView from "./abstractView";

class Details extends AbstractView {
  constructor(currency, interval) {
    super();
    // obtain currency from url, remove hash and replace underscore
    // with forward slash
    this.currency = location.hash.split("#")[1].replace("_", "/");
    this.interval = interval;
    this.setTitle(`${this.currency} | CryptoWhale`);
  }

  async getHtml() {
    return `
            <h2>${this.currency} <span>${this.interval}</span></h2>
            <h2 id="candlestick-ticker">-</h2>
            <div id="chart"></div>
        `;
  }

  async getData() {
    getCandlestick(this.currency, this.interval);
  }
}

export default Details;
