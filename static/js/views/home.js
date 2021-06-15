import AbstractView from "./abstractView";
import { getTicker } from "../helpers/data-service";
import "../components/TickerCard";

class Home extends AbstractView {
  constructor(currencyList) {
    super();
    this.setTitle("Home");
    this.currencyList = currencyList;
  }

  async getHtml() {
    return `
            <h1>Selected Cryptos</h1>
            <div class="row">
            ${this.currencyList
              .map((currency) => {
                return `<ticker-card currency=${currency}></ticker-card>`;
              })
              .join("")}
            </div>
        `;
  }

  async getData() {
    getTicker(this.currencyList);
  }
}

export default Home;
