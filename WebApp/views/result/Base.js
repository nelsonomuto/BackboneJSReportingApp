
define(['require', 'jquery', 'underscore', 'views/AbstractView'], function(require, $, _, Backbone, AbstractView) {
  AbstractView = require('views/AbstractView');
  return AbstractView.extend({
    accordionToggleClick: function() {
      return this.navigate('results/revise');
    },
    showResultsDisplay: function() {
      return $("#searchResults, #advancedSearch").fadeOut(400, function() {
        return $("#resultsDisplay").fadeIn(800);
      });
    },
    displayType: function(ev) {
      var val;
      val = $(ev.currentTarget).val();
      if (val === 'list') {
        return console.log('List View: ' + val);
      } else if (val === 'short') {
        return console.log('List View: ' + val);
      }
    },
    itemsPerPage: function(ev) {
      return console.log('Items Per Page: ' + $(ev.currentTarget).val());
    },
    quickResultsTable: function() {
      $('#resultsTableDisplay').dataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bSort: false,
        bInfo: false,
        bAutoWidth: false,
        aaData: [['Homeowner Exempt', 'Yes', 149], ['Owner', 'Jones, Scott', 3]],
        aoColumns: [
          {
            sTitle: 'Field',
            sClass: 'rgId'
          }, {
            sTitle: 'Criteria',
            sClass: 'rgCoApn'
          }, {
            sTitle: 'Found',
            sClass: 'rgOwn'
          }
        ]
      });
    },
    resultsGridTable: function() {
      $('#resultsGridTable').dataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bSort: false,
        bInfo: false,
        bAutoWidth: false,
        aaData: [[1, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [2, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [3, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [4, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [5, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [6, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [7, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"], [8, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]],
        aoColumns: [
          {
            "bSortable": false,
            "sTitle": "ID",
            "sClass": "rgId"
          }, {
            "sTitle": "Co/APN",
            "sClass": "rgCoApn"
          }, {
            "sTitle": "Owner",
            "sClass": "rgOwn"
          }, {
            "sTitle": "Address",
            "sClass": "rgAdd"
          }, {
            "sTitle": "Map",
            "sClass": "center rgMap"
          }, {
            "sClass": "center rgInd"
          }, {
            "sClass": "center rgCoInd"
          }
        ]
      });
    }
  });
});
