import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function shadowRoot(query) {
  const sr = document.getElementsByTagName('my-element')[0].shadowRoot;
  if(!query) {
    return sr;
  }
  return sr.querySelector(query);
}

module('Integration | Component | my-element', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MyElement/>`);

    assert.equal(this.element.textContent.trim(), '', 'no content leaked by shadow element');
    assert.equal(document.getElementsByTagName('my-element').length, 1, 'has the custom element in DOM');
    assert.ok(shadowRoot(), 'has a shadow root')
  });

  test('it renders with arguments', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MyElement
      @propstr={{this.propStr}}
      @propnum={{this.propNum}}
      @propbool={{this.propBool}}
      @proparr={{this.propArr}}
      @propobj={{this.propObj}}
    />`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders the string', async function(assert) {
    this.propStr = 'one';
    await render(hbs`<MyElement @propstr={{this.propStr}} />`);

    assert.equal(shadowRoot('[data-test-prop-str] > [data-test-typeof]').textContent, 'string');
    assert.equal(shadowRoot('[data-test-prop-str] > [data-test-value]').textContent, 'one');

    this.set('propStr', 'two');
    await settled();
    assert.equal(shadowRoot('[data-test-prop-str] > [data-test-value]').textContent, 'two');

    this.set('propStr', null);
    await settled();
    assert.equal(shadowRoot('[data-test-prop-str] > [data-test-value]').textContent, '');
  });

  test('it renders the number', async function(assert) {
    this.set('propNum', 12.3)
    await render(hbs`<MyElement @propnum={{this.propNum}} />`);

    assert.equal(shadowRoot('[data-test-prop-num] > [data-test-typeof]').textContent, 'number');
    assert.equal(shadowRoot('[data-test-prop-num] > [data-test-value]').textContent, '12.3');
    assert.equal(shadowRoot('[data-test-prop-num] > [data-test-plus-one]').textContent, '13.3');
  });

  test('it renders the boolean', async function(assert) {
    this.set('propBool', true)
    await render(hbs`<MyElement @propbool={{this.propBool}} />`);

    assert.equal(shadowRoot('[data-test-prop-bool] > [data-test-typeof]').textContent, 'boolean');
    assert.equal(shadowRoot('[data-test-prop-bool] > [data-test-value]').textContent, 'yes');

    this.set('propBool', false);
    await settled();
    assert.equal(shadowRoot('[data-test-prop-bool] > [data-test-value]').textContent, 'no');
  });

  test('it renders the array', async function(assert) {
    this.set('propArr', ['oh my god'])
    await render(hbs`<MyElement @proparr={{this.propArr}} />`);

    debugger;
    assert.equal(shadowRoot('[data-test-prop-arr] > [data-test-is-array]').textContent, 'true', 'is an array');
    assert.equal(shadowRoot('[data-test-prop-arr] > [data-test-length]').textContent, '1', 'length');

    assert.equal(shadowRoot('[data-test-prop-arr] > [data-test-first]').textContent, 'oh my god', 'renders the first');
  });

  test('it renders the object', async function(assert) {
    this.set('propObj', {foo: 'oh my foooo'})
    await render(hbs`<MyElement @propobj={{this.propObj}} />`);

    assert.equal(shadowRoot('[data-test-prop-obj] > [data-test-typeof]').textContent, 'object', 'is an object');
    assert.equal(shadowRoot('[data-test-prop-obj] > [data-test-foo]').textContent, 'oh my foooo', 'renders the property');
  });
});
