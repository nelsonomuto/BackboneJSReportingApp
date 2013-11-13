define [
  'require'
  'jquery'
  'Backbone'
  'models/AbstractModel'
  'collections/search/results'
], ( require, $, Backbone ) ->
  SearchResultsCollection = require 'collections/search/results'
  
  AbstractModel = require 'models/AbstractModel'
  
  return AbstractModel.extend
    defaults: null
    
    loadFromView: ( options ) ->      
      modelAsJson = $( options.selector ).find( 'select, input' ).serializeArray()
      $.each modelAsJson, ( i, item ) ->
        re = ///
        (?:\.([^.]+))?$
        ///
        modelAsJson[i].name = item.name.match(re)[1]        
        return
      @set modelAsJson
        
    query: ( options ) ->
      $( document ).ajaxStart ->
        console.log 'ajax started'
        window.App.startProgress()
        return
        
      $( document ).ajaxComplete ->
        console.log 'ajax finished'
        return
        
      payload = @toJSON()
      
      $.post '/api/SearchService/Query' + @viewModelName, payload, ( data ) ->
        
        results = new SearchResultsCollection()
        results.set data
        if options.success
          options.success.apply options.scope, [results, 'success', data]
        return
        
       .fail ->
        options.error.apply options.scope, [null, 'error', null]
        return
      
      return