define [
  'require'
  'jquery'
  'underscore'
  'views/AbstractView'
], ( require, $, _, Backbone, AbstractView ) ->

  AbstractView = require 'views/AbstractView'
  
  return AbstractView.extend     
      
    accordionToggleClick: ->
      @navigate 'results/revise'        
    
    showResultsDisplay: ->
      $("#searchResults, #advancedSearch").fadeOut 400, ->
        $("#resultsDisplay").fadeIn 800
    
    displayType: ( ev ) ->
      val = $( ev.currentTarget ).val()
      if val is 'list'
        console.log 'List View: ' + val
      else if val is 'short'
        console.log 'List View: ' + val
        
    itemsPerPage: ( ev ) ->
      console.log 'Items Per Page: ' + $( ev.currentTarget ).val()
      
    quickResultsTable: ->
      $( '#resultsTableDisplay' ).dataTable
        bPaginate: false
        bLengthChange: false
        bFilter: false
        bSort: false
        bInfo: false
        bAutoWidth: false
        aaData: [
          ['Homeowner Exempt', 'Yes', 149],
          ['Owner', 'Jones, Scott', 3]
        ]
        aoColumns: [
          sTitle: 'Field'
          sClass: 'rgId'
        ,
          sTitle: 'Criteria'
          sClass: 'rgCoApn'
        ,
          sTitle: 'Found'
          sClass: 'rgOwn'
        ]
      return
    resultsGridTable: ->
      $( '#resultsGridTable' ).dataTable
        bPaginate: false
        bLengthChange: false
        bFilter: false
        bSort: false
        bInfo: false
        bAutoWidth: false
        aaData: [
          [1, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [2, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [3, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [4, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [5, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [6, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [7, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
          [8, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
        ]
        
        aoColumns:[
          { "bSortable": false, "sTitle": "ID", "sClass": "rgId" }
          { "sTitle": "Co/APN", "sClass": "rgCoApn" }
          { "sTitle": "Owner", "sClass": "rgOwn" }
          { "sTitle": "Address", "sClass": "rgAdd" }
          { "sTitle": "Map", "sClass": "center rgMap" }
          { "sClass": "center rgInd" }
          { "sClass": "center rgCoInd" }
        ]
        
      return