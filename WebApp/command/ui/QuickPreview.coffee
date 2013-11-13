define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'command/ui/Base'
  'views/result/Preview'    
  'command/service/ExecuteSearch'
], (require, $, _, Backbone) ->
  BaseUiCommand = require 'command/ui/Base'

  class QuickPreviewCommand extends BaseUiCommand
  
    commandName: 'QuickPreviewCommand'
    
    commandView: 'views/result/Preview'
    
    commands: 
      executeSearch: 'command/service/ExecuteSearch'
    
    processInput: ( parameters ) ->
      
    doRun: ->     
      me = @
      
      @runCommand 'executeSearch', 
        searchModelPath: 'models/search/QuickSearch'
        viewSelector: '#Quick'
        
      .then ( model ) ->
        me.showView model, true
        
    
  return QuickPreviewCommand