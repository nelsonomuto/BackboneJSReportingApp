define [
  'require'
  'jquery'
  'command/AbstractCommand'
], ( require, $ ) ->
  AbstractCommand = require 'command/AbstractCommand'
  class BaseUiCommand extends AbstractCommand
  
    commandName: 'Base UI Command'
    
    commandView: ''
    
    getCommandView: ( params ) ->
      viewCls = require @commandView
      new viewCls params
    
    getViews: ->
      @parameters.App.getViews()
      
    getCurrentView: ->
      @getViews().current     
      
    setCurrentView: ( view ) ->
      @App.setCurrentView view
      
    hideCurrentView: ( fade = 200, callback ) ->    
      @log
        msg: 'command.ui.Base#hideCurrentView'
        dump:
          command: @
          fadeOut: fade
          callback: callback
      $( @getCurrentView().el ).fadeOut fade, callback      
    
    showViewTest: ->
      me = @
      @showView null, true
      setTimeout ->
        me.hideCurrentView()
      ,900
    
    doRun: ->
      @showViewTest()
      
    processInput: ->
    
    showViewBehavior:
      fade:
        currentViewAndHide: ( viewCls, opt ) ->          
          $( @currentView.el ).fadeOut 400, ->            
            @showOptFn opt, viewCls
            @showViewBehavior.fade.show()
            return
          return false
        notCurrentViewAndHide: ->
          return true
        show: ->
          $( @currentView.el ).fadeIn 800
          return
          
      notFade:
        currentViewAndHide: ->          
          $( @currentView.el ).hide()
          return true
        notCurrentViewAndHide: ->
          return true
        show: ->
          $( @currentView.el ).show()
          return
          
    showOptFn: ( opt, viewCls ) ->
      if opt is true
        @currentView = new viewCls opt
      else
        @currentView = new viewCls()
      @setCurrentView @currentView
      @currentView.render()
      return
      
    showView: ( hideOtherViews, fade, opt ) ->
      viewCls = require @commandView
      if views?.current?.id is viewCls.prototype.id
        return
      fade = true if not fade?
      hideOtherViews = true if not hideOtherViews?
      opt = false if not opt?

      if fade is true
       showBehaviorFade = 'fade' 
      else 
        showBehaviorFade = 'notFade'
      if (@currentView? and hideOtherViews is true)
        showBehaviorCurrentViewAndHide = 'currentViewAndHide'        
      else
        showBehaviorCurrentViewAndHide = 'notCurrentViewAndHide'
      
      console.log('showBehavior', {
        showViewBehavior: @showViewBehavior
        fn: @showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide]
        showBehaviorFade: showBehaviorFade,
        showBehaviorCurrentViewAndHide: showBehaviorCurrentViewAndHide
      });
      if @showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide].apply( this, [viewCls, opt]) is true
        @showOptFn opt, viewCls
        
      @showViewBehavior[showBehaviorFade]['show'].apply( this, []) 
      
      return    
    
  return BaseUiCommand