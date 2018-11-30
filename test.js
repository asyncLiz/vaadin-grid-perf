import 'regenerator-runtime';

import { LitElement, html } from '@polymer/lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid';

function random() {
  return (Math.random() + 1).toString(36).substring(7);
}

const data1 = [{
  first: random(),
  second: random(),
  third: random(),
  fourth: random(),
  fifth: random(),
  sixth: random(),
  seventh: random()
}];

const data5 = [];
for (let i = 0; i < 5; i++) {
  data5.push({
    first: random(),
    second: random(),
    third: random(),
    fourth: random(),
    fifth: random(),
    sixth: random(),
    seventh: random()
  });
}

const data25 = [];
for (let i = 0; i < 25; i++) {
  data25.push({
    first: random(),
    second: random(),
    third: random(),
    fourth: random(),
    fifth: random(),
    sixth: random(),
    seventh: random()
  });
}

const data500 = [];
for (let i = 0; i < 500; i++) {
  data500.push({
    first: random(),
    second: random(),
    third: random(),
    fourth: random(),
    fifth: random(),
    sixth: random(),
    seventh: random()
  });
}

class TestApp extends LitElement {
  clear() {
    this.items = [];
    this.requestUpdate('items');
  }

  load1() {
    this.items = data1;
    this.requestUpdate('items');
  }

  load5() {
    this.items = data5;
    this.requestUpdate('items');
  }

  load25() {
    this.items = data25;
    this.requestUpdate('items');
  }

  load500() {
    this.items = data500;
    this.requestUpdate('items');
  }

  render() {
    return html`
      <button @click="${this.clear}">Clear Items</button>
      <button @click="${this.load1}">Load 1 Item</button>
      <button @click="${this.load5}">Load 5 Items</button>
      <button @click="${this.load25}">Load 25 Items</button>
      <button @click="${this.load500}">Load 500 Items</button>
      <button @click="${this.patch}">Patch _updateItem</button>
      <button @click="${this.restore}">Restore _updateItem</button>
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="first" .renderer="${this.renderFirstCell}"></vaadin-grid-column>
        <vaadin-grid-column path="second"></vaadin-grid-column>
        <vaadin-grid-column path="third"></vaadin-grid-column>
        <vaadin-grid-column path="fourth"></vaadin-grid-column>
        <vaadin-grid-column path="fifth"></vaadin-grid-column>
        <vaadin-grid-column path="sixth"></vaadin-grid-column>
        <vaadin-grid-column path="seventh"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  renderFirstCell(root, column, model) {
    if (model.index === 0) {
      console.count('renderFirstCell (1st row)');
    }

    render(`${model.item.first}`, root);
  }

  patch() {
    const grid = this.shadowRoot.querySelector('vaadin-grid');
    if (!this.originalUpdateItem) {
      this.originalUpdateItem = grid._updateItem;
    }

    grid._updateItem = (row, item) => {
      row._item = item;
      const model = grid.__getRowModel(row);
      if (
        row._model && 
        row._model.index === model.index && 
        row._model.item === model.item && 
        row._model.level === model.level && 
        row._model.expanded === model.expanded && 
        row._model.selected === model.selected && 
        row._model.detailsOpened === model.detailsOpened
      ) {
        // The model has not changed for this row, don't re-render it
        return;
      }

      row._model = model;
      this.originalUpdateItem.call(grid, row, item);
    };
  }

  restore() {
    if (this.originalUpdateItem) {
      const grid = this.shadowRoot.querySelector('vaadin-grid');
      grid._updateItem = this.originalUpdateItem;
    }
  }
}

if (window.WebComponents.ready) {
  define();
} else {
  window.addEventListener('WebComponentsReady', define);
}

function define() {
  customElements.define('test-app', TestApp);
}