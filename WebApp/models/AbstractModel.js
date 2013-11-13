
define(['require', 'jquery', 'underscore', 'Backbone', 'commandInitiator/Abstract'], function(require, $, _, Backbone) {
  var AbstractCommandInitiator;
  AbstractCommandInitiator = require('commandInitiator/Abstract');
  return Backbone.Model.extend(_.extend({
    name: 'pqmvcmodel',
    commands: {}
  }, AbstractCommandInitiator));
});
