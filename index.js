'use strict';

const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const LitComponents = require('./lit-components');

module.exports = {
  name: require('./package').name,

  treeForApp() {
    const appTree = this._super.treeForApp.apply(this, arguments);

    const litElements = new Funnel(this.app.trees.app, {
      srcDir: 'lit-elements',
    });

    const litComponentsTree = new LitComponents([litElements]);

    return new MergeTrees([appTree, new Funnel(litComponentsTree, { destDir: 'components' })]);
  },
};
