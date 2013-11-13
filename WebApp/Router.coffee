define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'views/search/Panels'
  'views/search/PanelsRevise'
  'views/result/Preview'
  'views/result/Results'
  'views/result/parcel/Detail'
], ( require, $, _, Backbone, SearchPanelsView, SearchPanelsReviseSearchView, SearchPreviewView,
  SearchResultsView, ParcelDetailsView) ->

  SearchPanelsView = require 'views/search/Panels'
  SearchPanelsReviseSearchView = require 'views/search/PanelsRevise'
  SearchPreviewView = require 'views/result/Preview'
  SearchResultsView = require 'views/result/Results'
  ParcelDetailsView = require 'views/result/parcel/Detail'
  
  views = 
    SearchPanelsView: SearchPanelsView
    SearchPanelsReviseSearchView: SearchPanelsReviseSearchView
    SearchPreviewView: SearchPreviewView
    SearchResultsView: SearchResultsView
    ParcelDetailsView: ParcelDetailsView
  
  router = Backbone.Router.extend
  
    routes: 
      '': 'index'
      'search/:section(/:searchKey)': 'searchOptions'
      'results(/:mapOption)': 'searchResults'
      'details': 'parcelDetails' 

    index: ->   
      @showView( views.SearchPanelsView, false );
      
    showViewBehavior:
      fade:
        currentViewAndHide: ( view, opt ) ->          
          $( views.current.el ).fadeOut 400, ->            
            @showOptFn opt, view
            @showViewBehavior.fade.show()
            return
          return false
        notCurrentViewAndHide: ->
          return true
        show: ->
          $( views.current.el ).fadeIn 800
          return
          
      notFade:
        currentViewAndHide: ->          
          $( views.current.el ).hide()
          return true
        notCurrentViewAndHide: ->
          return true
        show: ->
          $( views.current.el ).show()
          return
          
    showOptFn: ( opt, view ) ->
      if opt is true
        views.current = new view opt
      else
        views.current = new view()
      views.current.render()
      return
      
    showView: ( view, hideOtherViews, fade, opt ) ->
      if views?.current?.id is view.prototype.id
        return
      fade = true if not fade?
      hideOtherViews = true if not hideOtherViews?
      opt = false if not opt?

      if fade is true
       showBehaviorFade = 'fade' 
      else 
        showBehaviorFade = 'notFade'
      if (views.current? and hideOtherViews is true)
        showBehaviorCurrentViewAndHide = 'currentViewAndHide'        
      else
        showBehaviorCurrentViewAndHide = 'notCurrentViewAndHide'
      
      console.log('showBehavior', {
        showViewBehavior: @showViewBehavior
        fn: @showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide]
        showBehaviorFade: showBehaviorFade,
        showBehaviorCurrentViewAndHide: showBehaviorCurrentViewAndHide
      });
      if @showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide].apply( this, [view, opt]) is true
        @showOptFn opt, view
        
      @showViewBehavior[showBehaviorFade]['show'].apply( this, []) 
      
      return
      
    searchOptions: ( section, searchKey ) ->
      console.log 'searchOptions',
        section: section
        searchKey: searchKey
        
      switch section
        when undefined
          @showView views.SearchPanelsView, false
        when 'quick'
          @showView views.SearchPanelsView, false, true,
            'search': 'quick'
        when 'advanced'
          @showView views.SearchPanelsView, false, true,
            'search': 'advanced'
        when 'preview'
          console.log 'Section: ' + section
          modelName = "Search#{searchKey}ViewModel"
          selector = '#' + searchKey
          searchModel = window.App.getModels()[modelName]
          model = new searchModel()
          window.App.setCurrentModel model
          model.loadFromView 
            selector: selector
          console.log 'Search model, section: ' + section,
            modelName: modelName
            selector: selector
            searchModel: searchModel
            model: model
            
          if not model.changedAttributes()
            console.log 'No search criteria',
              model: model
            
            @showView views.SearchPanelsView, true, true        
            return
            
          me = @
          model.query
            scope: me
            
            success: ( results, code, data ) ->
            
              console.log 'success'
              console.log data
              views.SearchPreviewView.model = results
              @showView views.SearchPreviewView, false              
              return
            error: ->
              console.log 'error'
      
      return 
      
    searchResults: ( mapOption ) ->
      if mapOption is 'showmap'
        @showView views.SearchResultsView, true, true, 
          'map': 'show'
      else if mapOption is 'revise'
        @showView views.SearchPanelsReviseSearchView, false, false,
          'search': 'advanced'
      else
        @showView views.SearchResultsView
    
      $( '#toolsList li' ).click ->
        $( '#toolsList > li' ).addClass 'hidden'
        $( @ ).addClass( 'active' ).removeClass 'hidden'
        $( '#toolboxIconBar' ).show()
        return
      return
      
    parcelDetails: ( mapOption ) ->
      if mapOption is 'showmap'
        @showView views.ParcelDetailsView, true, true, 
          'map': 'show'
      else
        @showView views.ParcelDetailsView
        
      return

    
  return {
    router: router
    views: views
  }