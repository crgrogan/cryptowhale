import AbstractView from "./abstractView.js";

class Details extends AbstractView {
  constructor() {
    super();
    this.setTitle("Details");
  }

  async getHtml() {
    return `
            <h1>Details</h1>
        `;
  }
}

export default Details;
