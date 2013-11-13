
define(['require', 'jquery', 'underscore', 'views/result/Base'], function(require, $, _, Backbone, BaseView) {
  BaseView = require('views/result/Base');
  return BaseView.extend({
    el: $('#viewHeader'),
    id: 'SearchPreviewView',
    render: function() {
      this.$el.html(this.initTemplate('searchResultsPreview_template'));
      this.quickResultsTable();
    },
    events: {
      'click .btnViewResults': 'showResults'
    },
    showResults: function() {
      if ($('input[name="showMap"]:checked').length > 0) {
        return this.navigate('results/showmap');
      } else {
        return this.navigate('results');
      }
    }
  });
});
