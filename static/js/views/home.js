import AbstractView from "./abstractView";
import { getTicker } from "../helpers/data-service";

class Home extends AbstractView {
  constructor(currency, interval) {
    super();
    this.setTitle("Home");
    this.currency = currency;
    this.interval = interval;
  }

  async getHtml() {
    return `
            <h1>Home</h1>
            <div id="ticker-price"></div>
        `;
  }

  async getData() {
    getTicker(this.currency);
  }
}

export default Home;
