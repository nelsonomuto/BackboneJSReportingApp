
define(['require', 'jquery', 'underscore', 'views/result/Base'], function(require, $, _, Backbone, BaseView) {
  BaseView = require('views/result/Base');
  return BaseView.extend({
    el: $('#viewContainer'),
    id: 'SearchResultsView',
    render: function() {
      this.$el.html(this.initTemplate('searchResults_template', window.App.getCurrentModel()));
      this.delegateEvents();
      $('#toolBox li').css('cursor', 'pointer');
      this.showMap();
      setTimeout(this.resultsGridTable, 1000);
    },
    events: {
      'click .accordion-toggle': 'accordionToggleClick',
      'change #pageLayoutOptions': 'pageLayout',
      'change #displayTypeOptions': 'displayType',
      'change #itemsPerPageOption': 'itemsPerPage'
    }
  });
});
