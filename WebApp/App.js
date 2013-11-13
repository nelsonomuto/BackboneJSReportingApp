
define(['jquery', 'underscore', 'Backbone', 'Router', 'models/result/Result', 'models/search/QuickSearch', 'models/search/advanced/Favorites', 'models/search/advanced/FindMyParcel', 'models/search/advanced/Geography', 'models/search/advanced/GetMeClose', 'models/search/advanced/Maps', 'models/search/advanced/PastSearches', 'models/search/advanced/RadiusampCompSearch', 'factory/ModelFactory'], function($, _, Backbone, Router) {
  var App;
  App = (function() {

    function App() {
      var RouterConfig, SearchAdvancedFavoritesViewModel, SearchAdvancedFindMyParcelsViewModel, SearchAdvancedGeographyViewModel, SearchAdvancedGetMeCloseViewModel, SearchAdvancedMapsViewModel, SearchAdvancedPastSearchesViewModel, SearchAdvancedRadiusampCompSearchViewModel, SearchQuickViewModel, modelFactoryCls;
      modelFactoryCls = require('factory/ModelFactory');
      this.modelFactory = new modelFactoryCls();
      RouterConfig = require('Router');
      SearchQuickViewModel = require('models/search/QuickSearch');
      SearchAdvancedFindMyParcelsViewModel = require('models/search/advanced/RadiusampCompSearch');
      SearchAdvancedGetMeCloseViewModel = require('models/search/advanced/GetMeClose');
      SearchAdvancedGeographyViewModel = require('models/search/advanced/Geography');
      SearchAdvancedMapsViewModel = require('models/search/advanced/Maps');
      SearchAdvancedRadiusampCompSearchViewModel = require('models/search/advanced/RadiusampCompSearch');
      SearchAdvancedFavoritesViewModel = require('models/search/advanced/Favorites');
      SearchAdvancedPastSearchesViewModel = require('models/search/advanced/PastSearches');
      this.router = new RouterConfig.router();
      this.views = RouterConfig.views;
      this.models = {
        SearchQuickViewModel: SearchQuickViewModel,
        SearchAdvancedFindMyParcelsViewModel: SearchAdvancedFindMyParcelsViewModel,
        SearchAdvancedGetMeCloseViewModel: SearchAdvancedGetMeCloseViewModel,
        SearchAdvancedGeographyViewModel: SearchAdvancedGeographyViewModel,
        SearchAdvancedMapsViewModel: SearchAdvancedMapsViewModel,
        SearchAdvancedRadiusampCompSearchViewModel: SearchAdvancedRadiusampCompSearchViewModel,
        SearchAdvancedFavoritesViewModel: SearchAdvancedFavoritesViewModel,
        SearchAdvancedPastSearchesViewModel: SearchAdvancedPastSearchesViewModel
      };
      return;
    }

    App.prototype.initialize = function() {
      return Backbone.history.start();
    };

    App.prototype.getRouter = function() {
      return this.router;
    };

    App.prototype.getViews = function() {
      return this.views;
    };

    App.prototype.getCurrentView = function() {
      return this.views.current;
    };

    App.prototype.setCurrentView = function(view) {
      return this.views.current = view;
    };

    App.prototype.getModels = function() {
      return this.models;
    };

    App.prototype.getCurrentModel = function() {
      return this.currentModel;
    };

    App.prototype.getModelInstanceByPath = function(path) {
      return this.modelFactory.getInstanceByPath(path);
    };

    App.prototype.setCurrentModel = function(model) {
      return this.currentModel = model;
    };

    App.prototype.navigate = function(fragment, opt) {
      return this.router.navigate(fragment, opt);
    };

    App.prototype.log = function(_arg) {
      var args, dump, error, msg;
      error = _arg.error, msg = _arg.msg, dump = _arg.dump;
      args = dump;
      console.log(msg, args);
      if (error != null) {
        return console.error(printStackTrace({
          e: error
        }));
      }
    };

    App.prototype.startProgress = function() {
      var progInterval, progPercent;
      console.log('start progress');
      progPercent = 0;
      return progInterval = setInterval(function() {
        if (progPercent < 100) {
          progPercent += 20;
          $('.progressBar').find('div').animate({
            width: progPercent * $('.progressBar').width() / 100
          }, 500).html(progPercent + '%&nbsp;');
        } else {
          $('.resultsProgress').fadeOut(200, function() {
            $('.resultsInfo').fadeIn(400);
          });
          clearInterval(progInterval);
          progPercent = 0;
        }
      }, 500);
    };

    return App;

  })();
  return App;
});
