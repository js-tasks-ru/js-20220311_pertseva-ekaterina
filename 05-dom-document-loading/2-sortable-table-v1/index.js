import {header} from "./index.spec";

export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();

  }

  getTableRow(item) {
    const cell = this.headerConfig.map(({id, template}) => {
      return {id, template};
    });

    return cell.map(({id, template}) => {
      return template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join("");
  }


  getTableRows(data = []) {
    return data.map(item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
      ${this.getTableRow(item)}
      </a>`;
    }).join("");
  }


  getTableHeaderRow({id, title, sortable} = {}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="asc">
        <span>${title}</span>
      </div>
      <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
  }

  getTableHeader() {
    return `
     <div data-element="header" class="sortable-table__header sortable-table__row">
     ${this.headerConfig.map(item => this.getTableHeaderRow(item)).join('')}
     </div>
    `;
  }


  getTableBody() {
    return `
    <div data-element="body" class="sortable-table_body">
        ${this.getTableRows(this.data)}
    </div>`;
  }

  getTable() {
    return `
    <div class= "sortable-table">
    ${this.getTableHeader()}
    ${this.getTableBody()}
    </div>`;
  }

  render() {
    const root = document.createElement('div');
    root.innerHTML = this.getTable();
    this.element = root.firstElementChild;
    this.subElements = this.getSubElements();
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

  sortData(field, order) {

    const array = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const {sortType, sortable} = column;
    //не работает второй тест. не могу понять почему.
    if(sortable === false) return array;

    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];
    return array.sort((a, b) => {
      switch (sortType) {
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      case 'number':
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }


  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.getTableRows(sortedData);
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

