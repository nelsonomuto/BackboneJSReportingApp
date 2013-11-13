define [
  'require'
  'jquery'
  'underscore'
  'views/result/Base'
], ( require, $, _, Backbone, BaseView ) ->

  BaseView = require 'views/result/Base'
  
  return BaseView.extend
    el: $( '#viewContainer' )
    id: 'SearchResultsView'
    render: ->
      @$el.html( @initTemplate( 'searchResults_template', window.App.getCurrentModel() ))
      @delegateEvents()
      $( '#toolBox li' ).css 'cursor', 'pointer'
      @showMap()
      setTimeout @resultsGridTable, 1000 
      return
      
    events: 
      'click .accordion-toggle': 'accordionToggleClick'
      'change #pageLayoutOptions': 'pageLayout'
      'change #displayTypeOptions': 'displayType'
      'change #itemsPerPageOption': 'itemsPerPage'      
   
    