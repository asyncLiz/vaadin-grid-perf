import 'regenerator-runtime';

import { LitElement, html } from '@polymer/lit-element';
import '@vaadin/vaadin-grid';

function random() {
  return (Math.random() + 1).toString(36).substring(7);
}

const data = [];
for (let i = 0; i < 500; i++) {
  data.push({
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
  load() {
    this.items = data;
    this.requestUpdate('items');
  }

  render() {
    return html`
      <button @click="${this.load}">Load Items</button>
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="first"></vaadin-grid-column>
        <vaadin-grid-column path="second"></vaadin-grid-column>
        <vaadin-grid-column path="third"></vaadin-grid-column>
        <vaadin-grid-column path="fourth"></vaadin-grid-column>
        <vaadin-grid-column path="fifth"></vaadin-grid-column>
        <vaadin-grid-column path="sixth"></vaadin-grid-column>
        <vaadin-grid-column path="seventh"></vaadin-grid-column>
      </vaadin-grid>
    `;
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