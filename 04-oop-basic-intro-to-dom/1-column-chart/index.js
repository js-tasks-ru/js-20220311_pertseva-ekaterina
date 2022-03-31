export default class ColumnChart {
  chartHeight = 50;
  subElements = {};

  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = data => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.render();
  }

  get template() {
    return `
    <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
       Total ${this.label}
        <a class="column-chart__link" href=${this.link}>View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">${this.getColumnsBody()}</div>
      </div>
    </div>;
    `;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove("column-chart_loading");
    }
    this.subElements = this.getSubElements();
  }

  update(data) {
    this.data = data;
    this.subElements.body.innerHTML = this.getColumnsBody(data);
  }

  getColumnsBody() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0) + '%';
      const value = String(Math.floor(item * scale));
      return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;

    }).join("");
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result [name] = subElement;
    }
    return result;

  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};

  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

}
