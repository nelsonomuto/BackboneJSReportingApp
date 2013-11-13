define [
  'require'
  'jquery'
  'underscore'
  'views/result/Base'
], ( require, $, _, Backbone, BaseView ) ->

  BaseView = require 'views/result/Base'
  
  return BaseView.extend
    el: $( '#viewContainer' )
    id: 'ParcelDetailsView'
    render: ->
      @$el.html( initTemplate( 'parcelDetails_template', window.App.getCurrentModel() ))
      return
      
    events:       
      'change #pageLayoutOptions': 'pageLayout'
      'change #displayTypeOptions': 'displayType'
      'change #itemsPerPageOption': 'itemsPerPage'      
   
    