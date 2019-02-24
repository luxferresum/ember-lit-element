import { LitElement, html } from 'lit-element';

export default class MyElement extends LitElement {
  static get properties() { return {
    propStr: { type: String },
    propNum: { type: Number },
    propBool: { type: Boolean },
    propArr: { type: Array },
    propObj: { type: Object }
  };}

  constructor() {
    super();
    this.propStr = '';
    this.propNum = 0;
    this.propBool = false;
    this.propArr = [];
    this.propObj = {};
  }

  render() {
    return html`
      <p data-test-prop-str>
        <span data-test-typeof>${typeof this.propStr}</span>
        <span data-test-value>${this.propStr}</span>
      </p>
      <p data-test-prop-num>
        <span data-test-typeof>${typeof this.propNum}</span>
        <span data-test-value>${this.propNum}</span>
        <span data-test-plus-one>${this.propNum + 1}</span>
      </p>
      <p data-test-prop-bool>
        <span data-test-typeof>${typeof this.propBool}</span>
        <span data-test-value>${this.propBool ? 'yes' : 'no'}</span>
      </p>
      <p data-test-prop-arr>
        <span data-test-length>${this.propArr.length}</span>
        <span data-test-is-array>${Array.isArray(this.propArr)}</span>
        <span data-test-first>${this.propArr[0]}</span>
      </p>
      <p data-test-prop-obj>
        <span data-test-typeof>${typeof this.propObj}</span>
        <span data-test-foo>${this.propObj.foo}</span>
      </p>
    `;
  }
}

customElements.define('my-element', MyElement);
