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
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column .renderer="${this.renderFirstCell}"></vaadin-grid-column>
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
    console.count('renderFirstCell');
    render(`${model.item.first}`, root);
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