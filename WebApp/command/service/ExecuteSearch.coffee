define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'command/service/Base'
], (require, $, _, Backbone) ->
  ServiceCommand = require 'command/service/Base'

  class ExecuteSearchCommand extends ServiceCommand
  
    commandName: 'ExecuteSearchCommand'
    
    commandModelPath: null
    
    processInput: ->
      @commandModelPath = @parameters.searchModelPath      
      @parameters.model = @getCommandModelInstance()
      
    doRun: ->   
      me = @
      model = @parameters.model 
      
      model.loadFromView
        selector: @parameters.viewSelector
      
      @App.currentModel = @parameters.model
      
      model.query
        success: ( results, code, data ) ->
          me.resolve model
        error: ->
          me.reject 'Error model#query'
    
  return ExecuteSearchCommand