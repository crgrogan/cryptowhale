class TickerCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
              <div id="ticker-symbol">${this.getAttribute("coin")}</div>
              <div id=${
                this.getAttribute("coin").replace("/", "") + "-price"
              } class="ticker-price">-</div>
              <div id=${
                this.getAttribute("coin").replace("/", "") + "-change"
              }>-</div>
              `;
  }
}

customElements.define("ticker-card", TickerCard);
