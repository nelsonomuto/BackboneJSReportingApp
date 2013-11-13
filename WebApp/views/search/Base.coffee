define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'views/AbstractView'
  'command/ui/QuickPreview'
], ( require, $, _, Backbone, AbstractView ) ->
  AbstractView = require 'views/AbstractView'
  
  return AbstractView.extend
    
    commands: 
      quickPreview: 'command/ui/QuickPreview'
    
    searchTab: ( ev ) ->
      if ev.target.id is 'quickSearchTab'
        @navigate 'search/quick', false
      else
        @navigate 'search/advanced', false
        
      that = $ '#' + ev.target.id
      $( '.searchTab' ).removeClass 'selected'
      that.addClass 'selected'
      $( '.searchFilters:visible' ).fadeOut 400, ->
        $(that.attr('rel')).fadeIn 500
        return
      return
    
    search: ( ev ) ->
      @navigate "search/preview/#{ $(ev.target).closest('div[class="inset2"]').attr( 'id' ) }"
      
    searchQuick: ->
      console.log 'searchQuick'
#      @navigate 'search/preview/Quick'
      @runCommand 'quickPreview'
      
    toggleAccordionInState: (e, selected) ->
      if selected is true
        $('> .btnAdvancedSearch').fadeOut()
        e.removeClass 'in'
      else
        $('> .btnAdvancedSearch').fadeIn()
        e.addClass 'in'
      return
    
    navigateToSearchSection: ( e ) ->
      that = $( e.target ).parents().filter '.accordion-heading'
      expanded = that.next().hasClass 'in'
      topLevel = that.parents().filter('.accordion-group').length <= 1
      if topLevel is true
        prefix = "#advancedSearchSections > .accordion-group > .inset1 > .inset2 > "
        @toggleAccordionInState( $(prefix + ".accordion-heading.in"), true )
        @toggleAccordionInState( $(prefix + ".accordion-body.in").collapse( 'toggle' ), true )
      @toggleAccordionInState that, expanded
      return