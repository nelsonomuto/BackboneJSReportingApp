define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'views/search/Base'
], ( require, $, _, Backbone, BaseView ) ->
  BaseView = require 'views/search/Base'
  return BaseView.extend
    el: $ '#viewContainer'
    id: 'SearchPanelsView'
    
    events:
      'click .btn.search': 'searchQuick'
      'click .btn.btnAdvancedSearch': 'search'
      'click .accordion-toggle': 'navigateToSearchSection'
      'click #quickSearchTab': 'searchTab'
      'click #advancedSearchTab': 'searchTab'
      
    render: ->            
      $( @el ).html( @initTemplate( 'searchPanels_template' ))            
      $( '.collapsed' ).collapse 'hide'
      if @options?.search?
        _.defer (opt) ->
          quickSearchTab = $ '#quickSearchTab'
          advancedSearchTab = $ '#advancedSearchTab'          
          that = opt.search is 'quick' ? quickSearchTab : advancedSearchTab
          $( '.searchTab' ).removeClass 'selected'
          that.addClass 'selected'
          $( '.searchFilters:visible' ).fadeOut 400, ->
            $(that.attr('rel')).fadeIn 500            
            return          
          return 
        , @options      
      return 
    
    