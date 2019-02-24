import {
  default as Component,
} from '@ember/component';

function shouldSetAttr(val) {
  return val !== false && val !== null && val !== undefined;
}

function serialize(value) {
  if(typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
}

export default class WrapperComponent extends Component {
  constructor() {
    super(...arguments);
  }

  didReceiveAttrs() {
    if(this.element) {
      this.setAttrs();
    }
  }

  didInsertElement() {
    this.setAttrs();
  }

  setAttrs() {
    for(const name of Object.keys(this.attrs)) {
      const value = this[name];
      if(shouldSetAttr(value)) {
        this.element.setAttribute(name, serialize(value));
      } else {
        if(this.element.hasAttribute(name)) {
          this.element.removeAttribute(name)
        }
      }
    }
  }
}
