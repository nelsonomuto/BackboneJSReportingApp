define [
  'jquery'
  'underscore'
  'Backbone'
  'Router'
  'models/result/Result'
  'models/search/QuickSearch'
  'models/search/advanced/Favorites'
  'models/search/advanced/FindMyParcel'
  'models/search/advanced/Geography'
  'models/search/advanced/GetMeClose'
  'models/search/advanced/Maps'
  'models/search/advanced/PastSearches'
  'models/search/advanced/RadiusampCompSearch'
  'factory/ModelFactory'
], ( $, _, Backbone, Router ) ->
  class App
    constructor: ->
      modelFactoryCls = require 'factory/ModelFactory'
      @modelFactory = new modelFactoryCls()
      RouterConfig = require 'Router'
      
      SearchQuickViewModel = require 'models/search/QuickSearch'
      SearchAdvancedFindMyParcelsViewModel = require 'models/search/advanced/RadiusampCompSearch'
      SearchAdvancedGetMeCloseViewModel = require 'models/search/advanced/GetMeClose'
      SearchAdvancedGeographyViewModel = require 'models/search/advanced/Geography'
      SearchAdvancedMapsViewModel = require 'models/search/advanced/Maps'
      SearchAdvancedRadiusampCompSearchViewModel = require 'models/search/advanced/RadiusampCompSearch'
      SearchAdvancedFavoritesViewModel = require 'models/search/advanced/Favorites'
      SearchAdvancedPastSearchesViewModel = require 'models/search/advanced/PastSearches'
      
      @router = new RouterConfig.router()
      @views = RouterConfig.views
      @models = 
        SearchQuickViewModel: SearchQuickViewModel
        SearchAdvancedFindMyParcelsViewModel: SearchAdvancedFindMyParcelsViewModel
        SearchAdvancedGetMeCloseViewModel: SearchAdvancedGetMeCloseViewModel
        SearchAdvancedGeographyViewModel: SearchAdvancedGeographyViewModel
        SearchAdvancedMapsViewModel: SearchAdvancedMapsViewModel
        SearchAdvancedRadiusampCompSearchViewModel: SearchAdvancedRadiusampCompSearchViewModel
        SearchAdvancedFavoritesViewModel: SearchAdvancedFavoritesViewModel
        SearchAdvancedPastSearchesViewModel: SearchAdvancedPastSearchesViewModel
      return
      
    initialize: ->
      Backbone.history.start()
      
    getRouter: ->
      @router
      
    getViews: ->
      @views
    
    getCurrentView: ->
      @views.current
      
    setCurrentView: ( view ) ->
      @views.current = view
    
    getModels: ->
      @models        
    
    getCurrentModel: ->
      @currentModel
    
    getModelInstanceByPath: ( path ) ->
      @modelFactory.getInstanceByPath path
    
    setCurrentModel: ( model ) ->
      @currentModel = model
      
    navigate: ( fragment, opt ) ->
      @router.navigate fragment, opt   
      
    log: ( {error, msg, dump} ) ->
      args = dump        
      console.log msg, args        
      if error?        
        console.error printStackTrace
          e: error
    
    startProgress: ->
      console.log 'start progress'
      progPercent = 0
      progInterval = setInterval ->
        if progPercent < 100
          progPercent += 20
          $('.progressBar').find( 'div' ).animate({width: progPercent * $('.progressBar').width()/100}, 500)
            .html progPercent + '%&nbsp;'
        else
          $( '.resultsProgress' ).fadeOut 200, ->
            $( '.resultsInfo' ).fadeIn 400
            return
          clearInterval progInterval
          progPercent = 0
        return
      , 500
        
  return App