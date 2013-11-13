
define(['require', 'jquery', 'underscore', 'views/result/Base'], function(require, $, _, Backbone, BaseView) {
  BaseView = require('views/result/Base');
  return BaseView.extend({
    el: $('#viewContainer'),
    id: 'ParcelDetailsView',
    render: function() {
      this.$el.html(initTemplate('parcelDetails_template', window.App.getCurrentModel()));
    },
    events: {
      'change #pageLayoutOptions': 'pageLayout',
      'change #displayTypeOptions': 'displayType',
      'change #itemsPerPageOption': 'itemsPerPage'
    }
  });
});
