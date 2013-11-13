
define(['require', 'jquery', 'Backbone', 'models/AbstractModel', 'collections/search/results'], function(require, $, Backbone) {
  var AbstractModel, SearchResultsCollection;
  SearchResultsCollection = require('collections/search/results');
  AbstractModel = require('models/AbstractModel');
  return AbstractModel.extend({
    defaults: null,
    loadFromView: function(options) {
      var modelAsJson;
      modelAsJson = $(options.selector).find('select, input').serializeArray();
      $.each(modelAsJson, function(i, item) {
        var re;
        re = /(?:\.([^.]+))?$/;
        modelAsJson[i].name = item.name.match(re)[1];
      });
      return this.set(modelAsJson);
    },
    query: function(options) {
      var payload;
      $(document).ajaxStart(function() {
        console.log('ajax started');
        window.App.startProgress();
      });
      $(document).ajaxComplete(function() {
        console.log('ajax finished');
      });
      payload = this.toJSON();
      $.post('/api/SearchService/Query' + this.viewModelName, payload, function(data) {
        var results;
        results = new SearchResultsCollection();
        results.set(data);
        if (options.success) {
          options.success.apply(options.scope, [results, 'success', data]);
        }
      }).fail(function() {
        options.error.apply(options.scope, [null, 'error', null]);
      });
    }
  });
});
