class TickerCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
            <a href='details#${this.getAttribute("coin").replace("/", "_")}'>
              <div id="ticker-symbol">${this.getAttribute("coin")}</div>
              <div id=${
                this.getAttribute("coin").replace("/", "") + "-price"
              } class="ticker-price">-</div>
              <div id=${
                this.getAttribute("coin").replace("/", "") + "-change"
              }>-</div>
            </a>
              `;
  }
}

customElements.define("ticker-card", TickerCard);
