/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addAddonToProject('lit-element', '^2.0.1');
    return this.addAddonToProject('ember-auto-import', '^1.2.21');
  }
};
