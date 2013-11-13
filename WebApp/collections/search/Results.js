define(['require', 'Backbone', 'models/result/Result'], function(require, Backbone, SearchResultModel) {
    SearchResultModel = require('models/result/Result');
    
    return Backbone.Collection.extend({
        model: SearchResultModel
    });
});
