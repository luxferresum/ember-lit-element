ember-lit-element
==============================================================================

This addons allows for easy integration of [LitElement](https://lit-element.polymer-project.org/) inside an ember project.
[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.2 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-lit-element
```


Usage
------------------------------------------------------------------------------

1. Place your LitElements inside `/app/lit-elements/my-element.js`.
2. Make sure to `export default` your LitElement class.
3. Make sure your call to `customElements.define('my-element', MyElement);` matches your filename. You can omit this call and `ember-lit-element` will automatically insert it.
4. Call your LitElement from your ember application with `<MyElement @myarg={{data}} />`.

`ember-lit-element` will automatically serialize your arguments as JSON. Passing `null`, `undefined` or `false` will remove the attribute from the custom element.
This aligns with the defaults of LitElement to handle attributes and allows to pass complex object or array structures to the LitElement.

Usage example
------------------------------------------------------------------------------

Define your LitElement inside `app/lit-elements/my-element.js` like this:
```
import { LitElement, html } from 'lit-element';

// It is import to *export default* the class.
export default class MyElement extends LitElement {
  static get properties() { return {
    data: { type: Object }
  };}

  constructor() {
    super();
    this.data = {};
  }

  render() {
    return html`
      <p>${this.data.title}</p>
    `;
  }
}

// I could omit this, but it *must* match the filename.
customElements.define('my-element', MyElement);

```

And then use it from any ember component or route template like this:
```
<MyElement
  @data={{hash title="Welcome to ember"}}
/>
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
