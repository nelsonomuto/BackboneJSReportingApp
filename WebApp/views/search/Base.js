
define(['require', 'jquery', 'underscore', 'Backbone', 'views/AbstractView', 'command/ui/QuickPreview'], function(require, $, _, Backbone, AbstractView) {
    AbstractView = require('views/AbstractView');
    return AbstractView.extend({
        commands: {
            quickPreview: 'command/ui/QuickPreview'
        },
        searchTab: function(ev) {
            var that;
            if (ev.target.id === 'quickSearchTab') {
                this.navigate('search/quick', false);
            } else {
                this.navigate('search/advanced', false);
            }
            that = $('#' + ev.target.id);
            $('.searchTab').removeClass('selected');
            that.addClass('selected');
            $('.searchFilters:visible').fadeOut(400, function() {
                $(that.attr('rel')).fadeIn(500);
            });
        },
        search: function(ev) {
            return this.navigate("search/preview/" + ($(ev.target).closest('div[class="inset2"]').attr('id')));
        },
        searchQuick: function() {
            console.log('searchQuick');
            return this.runCommand('quickPreview');
        },
        toggleAccordionInState: function(e, selected) {
            if (selected === true) {
                $('> .btnAdvancedSearch').fadeOut();
                e.removeClass('in');
            } else {
                $('> .btnAdvancedSearch').fadeIn();
                e.addClass('in');
            }
        },
        navigateToSearchSection: function(e) {
            var expanded, prefix, that, topLevel;
            that = $(e.target).parents().filter('.accordion-heading');
            expanded = that.next().hasClass('in');
            topLevel = that.parents().filter('.accordion-group').length <= 1;
            if (topLevel === true) {
                prefix = "#advancedSearchSections > .accordion-group > .inset1 > .inset2 > ";
                this.toggleAccordionInState($(prefix + ".accordion-heading.in"), true);
                this.toggleAccordionInState($(prefix + ".accordion-body.in").collapse('toggle'), true);
            }
            this.toggleAccordionInState(that, expanded);
        }
    });
});
