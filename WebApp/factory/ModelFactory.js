
define(['jquery', 'underscore', 'Backbone', 'Router', 'models/result/Result', 'models/search/QuickSearch', 'models/search/advanced/Favorites', 'models/search/advanced/FindMyParcel', 'models/search/advanced/Geography', 'models/search/advanced/GetMeClose', 'models/search/advanced/Maps', 'models/search/advanced/PastSearches', 'models/search/advanced/RadiusampCompSearch'], function($, _, Backbone, Router) {
  var ModelFactory;
  ModelFactory = (function() {

    ModelFactory.classes = null;

    ModelFactory.modelInstances = null;

    function ModelFactory() {
      var cls, path, _ref;
      this.modelInstances = {};
      this.classes = {
        'models/search/QuickSearch': require('models/search/QuickSearch'),
        'models/search/advanced/GetMeClose': require('models/search/advanced/GetMeClose'),
        'models/search/advanced/Geography': require('models/search/advanced/Geography'),
        'models/search/advanced/Maps': require('models/search/advanced/Maps'),
        'models/search/advanced/RadiusampCompSearch': require('models/search/advanced/RadiusampCompSearch'),
        'models/search/advanced/Favorites': require('models/search/advanced/Favorites'),
        'models/search/advanced/PastSearches': require('models/search/advanced/PastSearches')
      };
      _ref = this.classes;
      for (path in _ref) {
        cls = _ref[path];
        this.modelInstances[path] = new cls();
      }
    }

    ModelFactory.prototype.getInstanceByPath = function(path) {
      return this.modelInstances[path];
    };

    return ModelFactory;

  })();
  return ModelFactory;
});
