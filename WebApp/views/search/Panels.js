
define(['require', 'jquery', 'underscore', 'Backbone', 'views/search/Base'], function(require, $, _, Backbone, BaseView) {
  BaseView = require('views/search/Base');
  return BaseView.extend({
    el: $('#viewContainer'),
    id: 'SearchPanelsView',
    events: {
      'click .btn.search': 'searchQuick',
      'click .btn.btnAdvancedSearch': 'search',
      'click .accordion-toggle': 'navigateToSearchSection',
      'click #quickSearchTab': 'searchTab',
      'click #advancedSearchTab': 'searchTab'
    },
    render: function() {
      var _ref;
      $(this.el).html(this.initTemplate('searchPanels_template'));
      $('.collapsed').collapse('hide');
      if (((_ref = this.options) != null ? _ref.search : void 0) != null) {
        _.defer(function(opt) {
          var advancedSearchTab, quickSearchTab, that, _ref1;
          quickSearchTab = $('#quickSearchTab');
          advancedSearchTab = $('#advancedSearchTab');
          that = (_ref1 = opt.search === 'quick') != null ? _ref1 : {
            quickSearchTab: advancedSearchTab
          };
          $('.searchTab').removeClass('selected');
          that.addClass('selected');
          $('.searchFilters:visible').fadeOut(400, function() {
            $(that.attr('rel')).fadeIn(500);
          });
        }, this.options);
      }
    }
  });
});
