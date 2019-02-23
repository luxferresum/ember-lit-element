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

        customElements.define('${fp.kebabCase(name)}', LitElement);

        export default WrapperComponent.extend({ tagName: '${fp.kebabCase(name)}' });
      `);
    }
  }
}

module.exports = LitComponents;
