define [
  'require'
  'jquery'
  'underscore'
  'views/result/Base'
], ( require, $, _, Backbone, BaseView ) ->

  BaseView = require 'views/result/Base'
  
  return BaseView.extend
    el: $('#viewHeader')
    id: 'SearchPreviewView'
    render: ->
      @$el.html( @initTemplate('searchResultsPreview_template') )
      @quickResultsTable()
      return
      
    events:
      'click .btnViewResults': 'showResults'
    
    showResults: ->
      if $( 'input[name="showMap"]:checked' ).length > 0
        @navigate 'results/showmap'
      else
        @navigate 'results'