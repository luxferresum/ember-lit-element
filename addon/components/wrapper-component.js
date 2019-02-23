import {
  default as Component,
} from '@ember/component';

export default class WrapperComponent extends Component {
  constructor() {
    super(...arguments);
    this.attributes = [];
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
    const existingAttrs = [];

    // update existing attrs
    for(const attribute of this.attributes) {
      attribute.value = this.attrs[attribute.name];
      existingAttrs.push(attribute.name);
    }

    const newAttrs = Object.entries(this.attrs)
      .filter(key => !existingAttrs.includes(key));

    for(const [name, value] of newAttrs) {
      const attribute = document.createAttribute(name);
      attribute.value = value;
      this.element.setAttributeNode(attribute);
      this.attributes.push(attribute);
    }
  }
}
