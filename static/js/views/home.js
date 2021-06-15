import AbstractView from "./abstractView";
import { getTicker } from "../helpers/data-service";
import "../components/TickerCard";

class Home extends AbstractView {
  constructor(coinList) {
    super();
    this.setTitle("Home");
    this.coinList = coinList;
  }

  async getHtml() {
    return `
            <h1>24 Hour Tickers</h1>
            <div class="row">
            ${this.coinList
              .map((coin) => {
                return `<ticker-card coin=${coin}></ticker-card>`;
              })
              .join("")}
            </div>
        `;
  }

  async getData() {
    getTicker(this.coinList);
  }
}

export default Home;
