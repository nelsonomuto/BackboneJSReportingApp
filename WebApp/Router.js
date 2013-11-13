
define(['require', 'jquery', 'underscore', 'Backbone', 'views/search/Panels', 'views/search/PanelsRevise', 'views/result/Preview', 'views/result/Results', 'views/result/parcel/Detail'], function(require, $, _, Backbone, SearchPanelsView, SearchPanelsReviseSearchView, SearchPreviewView, SearchResultsView, ParcelDetailsView) {
  var router, views;
  SearchPanelsView = require('views/search/Panels');
  SearchPanelsReviseSearchView = require('views/search/PanelsRevise');
  SearchPreviewView = require('views/result/Preview');
  SearchResultsView = require('views/result/Results');
  ParcelDetailsView = require('views/result/parcel/Detail');
  views = {
    SearchPanelsView: SearchPanelsView,
    SearchPanelsReviseSearchView: SearchPanelsReviseSearchView,
    SearchPreviewView: SearchPreviewView,
    SearchResultsView: SearchResultsView,
    ParcelDetailsView: ParcelDetailsView
  };
  router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'search/:section(/:searchKey)': 'searchOptions',
      'results(/:mapOption)': 'searchResults',
      'details': 'parcelDetails'
    },
    index: function() {
      return this.showView(views.SearchPanelsView, false);
    },
    showViewBehavior: {
      fade: {
        currentViewAndHide: function(view, opt) {
          $(views.current.el).fadeOut(400, function() {
            this.showOptFn(opt, view);
            this.showViewBehavior.fade.show();
          });
          return false;
        },
        notCurrentViewAndHide: function() {
          return true;
        },
        show: function() {
          $(views.current.el).fadeIn(800);
        }
      },
      notFade: {
        currentViewAndHide: function() {
          $(views.current.el).hide();
          return true;
        },
        notCurrentViewAndHide: function() {
          return true;
        },
        show: function() {
          $(views.current.el).show();
        }
      }
    },
    showOptFn: function(opt, view) {
      if (opt === true) {
        views.current = new view(opt);
      } else {
        views.current = new view();
      }
      views.current.render();
    },
    showView: function(view, hideOtherViews, fade, opt) {
      var showBehaviorCurrentViewAndHide, showBehaviorFade, _ref;
      if ((views != null ? (_ref = views.current) != null ? _ref.id : void 0 : void 0) === view.prototype.id) {
        return;
      }
      if (!(fade != null)) {
        fade = true;
      }
      if (!(hideOtherViews != null)) {
        hideOtherViews = true;
      }
      if (!(opt != null)) {
        opt = false;
      }
      if (fade === true) {
        showBehaviorFade = 'fade';
      } else {
        showBehaviorFade = 'notFade';
      }
      if ((views.current != null) && hideOtherViews === true) {
        showBehaviorCurrentViewAndHide = 'currentViewAndHide';
      } else {
        showBehaviorCurrentViewAndHide = 'notCurrentViewAndHide';
      }
      console.log('showBehavior', {
        showViewBehavior: this.showViewBehavior,
        fn: this.showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide],
        showBehaviorFade: showBehaviorFade,
        showBehaviorCurrentViewAndHide: showBehaviorCurrentViewAndHide
      });
      if (this.showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide].apply(this, [view, opt]) === true) {
        this.showOptFn(opt, view);
      }
      this.showViewBehavior[showBehaviorFade]['show'].apply(this, []);
    },
    searchOptions: function(section, searchKey) {
      var me, model, modelName, searchModel, selector;
      console.log('searchOptions', {
        section: section,
        searchKey: searchKey
      });
      switch (section) {
        case void 0:
          this.showView(views.SearchPanelsView, false);
          break;
        case 'quick':
          this.showView(views.SearchPanelsView, false, true, {
            'search': 'quick'
          });
          break;
        case 'advanced':
          this.showView(views.SearchPanelsView, false, true, {
            'search': 'advanced'
          });
          break;
        case 'preview':
          console.log('Section: ' + section);
          modelName = "Search" + searchKey + "ViewModel";
          selector = '#' + searchKey;
          searchModel = window.App.getModels()[modelName];
          model = new searchModel();
          window.App.setCurrentModel(model);
          model.loadFromView({
            selector: selector
          });
          console.log('Search model, section: ' + section, {
            modelName: modelName,
            selector: selector,
            searchModel: searchModel,
            model: model
          });
          if (!model.changedAttributes()) {
            console.log('No search criteria', {
              model: model
            });
            this.showView(views.SearchPanelsView, true, true);
            return;
          }
          me = this;
          model.query({
            scope: me,
            success: function(results, code, data) {
              console.log('success');
              console.log(data);
              views.SearchPreviewView.model = results;
              this.showView(views.SearchPreviewView, false);
            },
            error: function() {
              return console.log('error');
            }
          });
      }
    },
    searchResults: function(mapOption) {
      if (mapOption === 'showmap') {
        this.showView(views.SearchResultsView, true, true, {
          'map': 'show'
        });
      } else if (mapOption === 'revise') {
        this.showView(views.SearchPanelsReviseSearchView, false, false, {
          'search': 'advanced'
        });
      } else {
        this.showView(views.SearchResultsView);
      }
      $('#toolsList li').click(function() {
        $('#toolsList > li').addClass('hidden');
        $(this).addClass('active').removeClass('hidden');
        $('#toolboxIconBar').show();
      });
    },
    parcelDetails: function(mapOption) {
      if (mapOption === 'showmap') {
        this.showView(views.ParcelDetailsView, true, true, {
          'map': 'show'
        });
      } else {
        this.showView(views.ParcelDetailsView);
      }
    }
  });
  return {
    router: router,
    views: views
  };
});
