define ['require'], ( require ) ->
  class AbstractCommandInitiator
    commands: {}
    
    getCommandClsByPath: ( path ) ->
      try      
        cls =  require @commands[path]
      catch error
        window.App.log
          msg: 'AbstractCommandInitiator#getCommandClsByPath: ' + path
          dump:
            commandInitiator: @
            path: path
          error: error
      finally
        return cls
      
      
    runCommand: ( commandClsPath, parameters ) ->      
      commandCls = @getCommandClsByPath commandClsPath
      command = new commandCls parameters
      command.run()
      
  return AbstractCommandInitiator