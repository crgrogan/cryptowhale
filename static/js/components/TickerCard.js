class TickerCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div class="col s12 m4 l3">
                <div class="card white center-align z-depth-2">
                  <div class="card-content black-text">
                    <div  id="ticker-symbol">${this.getAttribute("coin")}</div>
                      <div id=${
                        this.getAttribute("coin").replace("/", "") + "-price"
                      } class="ticker-price">-</div>
                        <div id=${
                          this.getAttribute("coin").replace("/", "") + "-change"
                        }>-</div>
                </div>
              </div>`;
  }
}

customElements.define("ticker-card", TickerCard);
