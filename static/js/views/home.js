import AbstractView from "./abstractView";
import { getTicker } from "../helpers/data-service";
import "../components/TickerCard";

class Home extends AbstractView {
  constructor(coinList) {
    super();
    this.setTitle("24 Hour Tickers | CryptoWhale");
    this.coinList = coinList;
  }

  async getHtml() {
    return `
      <div class="carousel">
        ${this.coinList
          .map((coin) => {
            return `<ticker-card class="carousel-item center z-depth-2" coin=${coin}></ticker-card>`;
          })
          .join("")}  
      </div>  
        `;
  }

  async getData() {
    getTicker(this.coinList);
    this.renderCarousel();
  }

  // initialise carousel
  renderCarousel() {
    const elements = document.querySelectorAll(".carousel");
    const instances = M.Carousel.init(elements, {
      indicators: true,
    });
    const carouselItems = document.querySelectorAll(".carousel-item");

    // autoplay slides
    let indicatorItems = document.querySelectorAll(".carousel .indicator-item");
    let slideTime = 5000;
    let activeClass = "active";
    let autoplay = true;

    // stop autoplay if hovering on carousel item
    carouselItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        autoplay = false;
      });
    });

    carouselItems.forEach((item) => {
      item.addEventListener("mouseleave", () => {
        autoplay = true;
      });
    });

    setInterval(() => {
      if (autoplay) {
        indicatorItems.forEach((item) => {
          if (item.classList.contains(activeClass)) {
            let nextItem = item.nextElementSibling;
            if (nextItem == null) {
              indicatorItems[0].click();
            } else {
              // nextItem.click();
              instances[0].next();
            }
          }
        });
      }
    }, slideTime);
  }
}

export default Home;
