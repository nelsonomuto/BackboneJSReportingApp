require.config
  urlArgs: "=" +  (new Date()).getTime()
  shim:
    'Backbone':
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    'underscore': 
      exports: '_'
    'bootstrap':
      deps: ['jquery']
      exports: '$.fn.popover'
  enforceDefine: true
  paths:
#    jqueryUi: '../Scripts/jquery-ui-1.9.2.min'
    jqueryUi: '../Scripts/jquery-ui-1.9.2'
#    jquery: '../Scripts/jquery-1.8.2.min'
    jquery: '../Scripts/jquery-1.8.2'
    jqueryDatatables: '../Scripts/jquery-datatables'
    superfish: '../Scripts/superfish-1.5.11'
    bootstrap: '../Scripts/bootstrap'
#    underscore: '../Scripts/underscore.min'
    underscore: '../Scripts/underscore'
#    Backbone: '../Scripts/backbone.min'
    Backbone: '../Scripts/backbone'
    
define [  
  'jquery'
  'App'
  'jqueryDatatables'
  'underscore'
  'bootstrap'
  'Backbone' 
], ( $, PQMVC , jdtbls, _, bstrp, Backbone ) ->  
  `
  window.App = new PQMVC();  
  
  window.App.initialize();
  
  $(".dropdown-menu option").click(function () {
          $(".btn:first-child").text($(this).text());
          $(".btn:first-child").val($(this).text());
  });

  $('.menu li').children('ul').hide();
  $('.menu li').hover(
          function () { $(this).children('ul').fadeIn(); },
          function () { $(this).children('ul').fadeOut(); });

  //SUPPORT HINTS
  $('#ShowSupportHints').change(function() {
          updateSupportHints(this.checked);
  });

  var updateSupportHints = function(checked) {
          if (checked)
                  $(".helpHint").css('display', 'inline-block')
                          .css("visibility", "visible").hide().fadeIn();
          else
                  $(".helpHint").fadeOut("normal", function() {
                          var that = $(this);
                          that.css("visibility", "hidden");
                          if (that.parents().hasClass('menu')) // For ribbon help hints
                                  that.css('display', 'none');
                  });
  };
  updateSupportHints($('#ShowSupportHints')[0].checked);

  $('.option > label').click(function() {
          var e = $(this).parent().children().first();
          e.prop('checked', !e.is(':checked')).change();
          return false;
  });

  $(".notifications .indicator").click(function() {
          $(this).parent().children().last().fadeToggle();
  });

  /*$("[name=viewResults]").click(function () {
          $("#searchResults, #advancedSearch").fadeOut(400, function () {
                  $("#resultsDisplay").fadeIn(800);
          });
  });*/

  //DATATABLE: RECENT SEARCHES
  $('#recentSearchesDataTable').dataTable({
          "bPaginate": false,
          "bLengthChange": false,
          "bFilter": false,
          "bSort": false,
          "bInfo": false,
          "bAutoWidth": false,
          "aaData": [
                  /* Reduced data set */
                  ["Trident", "Internet Explorer 5.5", 5.5, "A"],
                  ["Trident", "Internet Explorer 6.0", 6, "A"],
                  ["Trident", "Internet Explorer 7.0", 7, "A"],
                  ["Gecko", "Firefox 1.5", 1.8, "A"],
                  ["Gecko", "Firefox 2", 1.8, "A"],
                  ["Gecko", "Firefox 3", 1.9, "A"],
                  ["Webkit", "Safari 2.0", 419.3, "A"],
                  ["Webkit", "Safari 3.0", 522.1, "A"]
          ],
          "aoColumns": [
                  { "sTitle": "Favorite" },
                  { "sTitle": "Criteria" },
                  { "sTitle": "Found" },
                  { "sTitle": "", "sClass": "center" }
          ]
  });

  //DATATABLE: FAVORITES
  $('#favoritesDataTable').dataTable({
          "bPaginate": false,
          "bLengthChange": false,
          "bFilter": false,
          "bSort": false,
          "bInfo": false,
          "bAutoWidth": false,
          "aaData": [
                  /* Reduced data set */
                  ["Trident"],
                  ["Gecko"],
                  ["Webkit"]
          ],
          "aoColumns": [
                  { "sTitle": "Parcels" }
          ]
  });

  //DATATABLE: SEARCH RESULTS GRID
  /*
          Need to add:
                  - row numbering
                  - row select checkbox
                  - sorting
  */
  //$('#resultsGridTable').dataTable({
  //	"bPaginate": false,
  //	"bLengthChange": false,
  //	"bFilter": false,
  //	"bSort": false,
  //	"bInfo": false,
  //	"bAutoWidth": false,
  //	"aaData": [
  //		/* Reduced data set */
  //		[1, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[2, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[3, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[4, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[5, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[6, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[7, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"],
  //		[8, "ALA 010-0778-011-00", "Stinson Ralf H II & APA Fund Etal", "440 Grand Ave, Oakland, CA 94610-5029", "Map", "Index", "County Index"]
  //	],
  //	"aoColumns": [
  //		{ "bSortable": false, "sTitle": "ID", "sClass": "rgId" },
  //		{ "sTitle": "Co/APN", "sClass": "rgCoApn" },
  //		{ "sTitle": "Owner", "sClass": "rgOwn" },
  //		{ "sTitle": "Address", "sClass": "rgAdd" },
  //		{ "sTitle": "Map", "sClass": "center rgMap" },
  //		{ "sClass": "center rgInd" },
  //		{ "sClass": "center rgCoInd" }
  //	]
  //});

  ////DATATABLE: QUICK VIEW SEARCH RESULTS
  //$('#resultsTableDisplay').dataTable({
  //	"bPaginate": false,
  //	"bLengthChange": false,
  //	"bFilter": false,
  //	"bSort": false,
  //	"bInfo": false,
  //	"bAutoWidth": false,
  //	"aaData": [
  //		/* Reduced data set */
  //		["Homeowner Exempt", "Yes", 149],
  //		["Owner", "Jones, Scott", 3]
  //	],
  //	"aoColumns": [
  //		{ "sTitle": "Field", "sClass": "rgId" },
  //		{ "sTitle": "Criteria", "sClass": "rgCoApn" },
  //		{ "sTitle": "Found", "sClass": "rgOwn" }
  //	]
  //});`
  return
`
//Progress bar functionality
//Example call: progress(80, $('#progressBar'));
var progInterval;

function progress(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}

function startProgress() {
	console.log('start progress');
	var progPercent = 0;
	progInterval = setInterval(function () {
		if (progPercent < 100) {
			progPercent += 20;
			progress(progPercent, $('.progressBar'));
		} else {
			showPreviewResults();
			clearInterval(progInterval)
			progPercent = 0;
		}
	}, 500);
}

function showPreviewResults() {
	$('.resultsProgress').fadeOut(200, function () {
		$('.resultsInfo').fadeIn(400);
	});
}


//Pulled out of flow and stored here in case the below toolbox setup needs 
//	to be reviewed once re-implemented

//searchResultsExpanded: function () {
//	//showView(views.SearchResultsView);

//	$('#toolsList li').click(function () {
//		$('#toolsList > li').removeClass('hidden');
//		$(this).removeClass('active');
//		$('#toolboxIconBar').hide();
//	});

//	$('#toolboxIconBar').click(function () {
//		$('#toolsList > li').removeClass('hidden').removeClass('active');
//		$(this).hide();
//	});

//},`