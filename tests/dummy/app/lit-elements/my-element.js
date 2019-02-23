export default class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const content = document.createElement('span');
    content.textContent = "Hello This World";

    shadow.appendChild(content);
  }
}
