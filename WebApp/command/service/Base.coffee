define [
  'command/AbstractCommand'
], () ->
  AbstractCommand = require 'command/AbstractCommand'
  class BaseServiceCommand extends AbstractCommand
  
    commandName: 'Base Service Command'
    
    commandModelPath: ''
    
    doRun: ( deferred ) ->
    
    getCommandModelInstance: ->
      @App.getModelInstanceByPath @commandModelPath      
    
  return BaseServiceCommand