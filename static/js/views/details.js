import { getCandlestick } from "../helpers/data-service";
import AbstractView from "./abstractView";

class Details extends AbstractView {
  constructor(currency, interval) {
    super();
    this.setTitle("Details");
    this.currency = currency;
    this.interval = interval;
  }

  async getHtml() {
    return `
            <h1>Details</h1>
            <div id="chart"></div>
        `;
  }

  async getData() {
    getCandlestick(this.currency, this.interval);
  }
}

export default Details;
