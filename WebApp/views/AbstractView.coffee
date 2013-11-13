define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'commandInitiator/Abstract'
], ( require, $, _, Backbone ) ->
  AbstractCommandInitiator = require 'commandInitiator/Abstract'
  
  return Backbone.View.extend _.extend
    name: 'pqmvcview'
    
    initTemplate: ( selector, model ) ->
      if model?
        return _.template( $("#" + selector).html(), model.toJSON())
      
      return _.template($("#" + selector).html())
    
    navigate: ( route, opt ) ->
      opt = true if not opt?
      window.App.router.navigate route, 
        trigger: opt
      
      return   
    
    showMap: ->
      if @options.map is 'show'
        $( '#mapTools' ).css 'display', 'block'
        $( '#pageLayoutOptions' ).val 'show'
      else
        $( '#pageLayoutOptions' ).val 'hide'
      return
      
    pageLayout: ( ev ) ->
      val = $( ev.currentTarget ).val()
      if val is 'show'
        $( '#mapTools' ).fadeIn 400
      else if val is 'hide'
        $( '#mapTools' ).fadeOut 400
      return
      
  , new AbstractCommandInitiator()