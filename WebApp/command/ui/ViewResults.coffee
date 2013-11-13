define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'command/ui/Base'
  'views/result/Preview'    
]
, (require, $, _, Backbone) ->

  BaseUiCommand = require 'command/ui/Base'

  class ViewResultsCommand extends BaseUiCommand
  
    commandName: 'ViewResults'
    
    commandView: 'views/result/Results'
    
    commands: {}
    
    processInput: ( parameters ) ->
      
    doRun: ->     
      me = @              
    
  return ViewResultsCommand