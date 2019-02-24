const Plugin = require('broccoli-caching-writer');
const fs = require('fs');
const path = require('path');
const fp = require('lodash/fp');

class LitComponents extends Plugin {
  constructor() {
    super(...arguments);
  }

  build() {
    for(const file of this.listFiles()) {
      const name = path.basename(file, '.js');
      const dir = path.dirname(file);

      fs.writeFileSync(path.join(this.outputPath, `${name}.hbs`), '');

      fs.writeFileSync(path.join(this.outputPath, `${name}.js`), `
        import LitElement from '../lit-elements/${name}';
        import WrapperComponent from 'ember-lit-element/components/wrapper-component';

        const registeredElement = customElements.get('${fp.kebabCase(name)}');
        if(registeredElement) {
          if(LitElement !== registeredElement) {
            throw 'another custom element with the name ${fp.kebabCase(name)} is already defined.';
          }
        } else {
          customElements.define('${fp.kebabCase(name)}', LitElement);
        }


        export default WrapperComponent.extend({ tagName: '${fp.kebabCase(name)}' });
      `);
    }
  }
}

module.exports = LitComponents;
