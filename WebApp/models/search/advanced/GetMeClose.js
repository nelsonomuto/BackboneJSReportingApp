define(['require', 'Backbone', 'models/search/Base'], function(require, Backbone, BaseSearchModel) {
    BaseSearchModel = require('models/search/Base');
    return BaseSearchModel.extend({
        defaults: {
            categoryName: 'Get Me Close',
            sectionId: 'GetMeClose'
        },
        viewModelName: 'GetMeClose'
    });
});
