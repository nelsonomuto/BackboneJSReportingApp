define(['require', 'jquery', 'underscore', 'Backbone', 'views/search/Base'], function(require, $, _, Backbone, BaseView) {
    BaseView = require('views/search/Base');
    return BaseView.extend({
        el: $('#searchRevise'),
        id: 'SearchPanelsReviseSearchView',
        events: {
            'click .btn.btnAdvancedSearch': 'search',
            'click .accordion-toggle': 'navigateToSearchSection',
            'click #quickSearchTab': 'searchTab',
            'click #advancedSearchTab': 'searchTab'
        },
        render: function() {
            $(this.el).html(this.initTemplate('searchPanels_template'));
            this.delegateEvents();
            _.defer(function(opt) {
                var searchId;
                searchId = $('.search-section').attr('id');
                $('#searchGroupHeader').css('display', 'none');
                $('#searchTabs').css('display', 'none');
                $('#quickSearch').css('display', 'none');
                $('#advancedSearch').css('display', 'block');
                $("div[id*='Advanced']").closest('.accordion-group').css('display', 'none');
                $("#Advanced" + searchId).closest('.accordion-group').css('display', 'block');
                $('.accordion-body').collapse('show');
                $('div.accordion-heading').toggleClass('in');
            }, this.options);
        }
    });
});
