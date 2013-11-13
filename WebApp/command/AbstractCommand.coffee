define ['require', 'jquery', 'underscore', 'commandInitiator/Abstract'], (require, $, _) ->
  
  AbstractCommandInitiator = require 'commandInitiator/Abstract'
  
  commandInitiatorMixin = new AbstractCommandInitiator()
  
  class AbstractCommand
    
    commandName: 'AbstractCommand'
    
    commands: {}
    
    constructor: ( @parameters ) ->
      
      _.extend this, commandInitiatorMixin, 
        commands: this.commands
      
      if not @parameters?
        @parameters =
          App: window.App
      else
        @parameters.App = window.App
      @App = window.App
      
      try
        @processInput()
      catch error
        @log 
          msg: 'AbstractCommand#processInput Error: ' + @commandName
          error: error
          dump:
            command: @
            parameters: @parameters
            processInput: @processInput
    
    processInput: ->
    
    log: ( args ) ->
      @App.log args
      
    run: ->
      @deferred = $.Deferred()
      @log 
        msg: 'AbstractCommand#run DEFERRED START: ' + @commandName
        dump:
          command: @
          parameters: @parameters
          doRun: @doRun
      try
        @doRun()
      catch error
        @log 
          msg: 'AbstractCommand#run error: ' + @commandName
          error: error
          dump:
            command: @
            parameters: @parameters
            doRun: @doRun
      finally
        return @deferred.promise()
        
    doRun: ->
      
    resolve: ( value ) ->
      @deferred.resolve value
      @log
        msg: 'AbstractCommand#run DEFERRED RESOLVED: ' + @commandName
        dump:
          resolvedWith: value
          command: @
          parameters: @parameters
          doRun: @doRun
          
    reject: ( value ) ->
      @deferred.reject value
      @log
        msg: 'AbstractCommand#run DEFERRED REJECTED: ' + @commandName
        dump:
          rejectedWith: value
          command: @
          parameters: @parameters
          doRun: @doRun
          
  return AbstractCommand