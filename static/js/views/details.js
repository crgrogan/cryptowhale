import { getCandlestick, getTicker } from "../helpers/data-service";
import AbstractView from "./abstractView";

class Details extends AbstractView {
  constructor(coin, interval) {
    super();
    // obtain coin from url, remove hash and replace underscore
    // with forward slash
    this.coin = location.hash.split("#")[1].replace("_", "/");
    this.interval = interval;
    this.setTitle(`${this.coin} | CryptoWhale`);
  }

  async getHtml() {
    return `
            <section id="candlestick-info">
              <div class="left">
                <div id="candlestick-info-coin">${this.coin}</div>
                <div id="candlestick-info-ticker">-</div>
              </div>
              <div class="right">
                <div>
                  <span class="candlestick-info-title">24h Change</span>
                  <span id=${this.coin.replace("/", "") + "-change"}>-</span>
                </div>
                <div>
                  <span class="candlestick-info-title">24h High</span>
                  <span id=${this.coin.replace("/", "") + "-high"}>-</span>
                </div>
                <div>
                  <span class="candlestick-info-title">24h Low</span>
                  <span id=${this.coin.replace("/", "") + "-low"}>-</span>
                </div>
                <div>
                  <span class="candlestick-info-title">24h Vol (${
                    this.coin.split("/")[1]
                  })</span>
                  <span id=${this.coin.replace("/", "") + "-volume"}>-</span>
                </div>
                </div>
            </section>
            <div id="candlestick-chart"></div>
            <div id="candlestick-interval"><span >Interval:</span > ${
              this.interval
            }</div>
        `;
  }

  async getData() {
    getTicker([this.coin]);
    getCandlestick(this.coin, this.interval);
  }
}

export default Details;
