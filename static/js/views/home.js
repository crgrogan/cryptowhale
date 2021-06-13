import AbstractView from "./abstractView.js";

class Home extends AbstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }

  async getHtml() {
    return `
            <h1>Home</h1>
        `;
  }
}

export default Home;
