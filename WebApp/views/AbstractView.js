
define(['require', 'jquery', 'underscore', 'Backbone', 'commandInitiator/Abstract'], function(require, $, _, Backbone) {
  var AbstractCommandInitiator;
  AbstractCommandInitiator = require('commandInitiator/Abstract');
  return Backbone.View.extend(_.extend({
    name: 'pqmvcview',
    initTemplate: function(selector, model) {
      if (model != null) {
        return _.template($("#" + selector).html(), model.toJSON());
      }
      return _.template($("#" + selector).html());
    },
    navigate: function(route, opt) {
      if (!(opt != null)) {
        opt = true;
      }
      window.App.router.navigate(route, {
        trigger: opt
      });
    },
    showMap: function() {
      if (this.options.map === 'show') {
        $('#mapTools').css('display', 'block');
        $('#pageLayoutOptions').val('show');
      } else {
        $('#pageLayoutOptions').val('hide');
      }
    },
    pageLayout: function(ev) {
      var val;
      val = $(ev.currentTarget).val();
      if (val === 'show') {
        $('#mapTools').fadeIn(400);
      } else if (val === 'hide') {
        $('#mapTools').fadeOut(400);
      }
    }
  }, new AbstractCommandInitiator()));
});
