define(['require', 'Backbone', 'models/search/Base'], function(require, Backbone, BaseSearchModel) {
    BaseSearchModel = require('models/search/Base');
    return BaseSearchModel.extend({
        defaults: {
            categoryName: 'Radius &amp; Comp Search',
            sectionId: 'RadiusampCompSearch'
        },
        viewModelName: 'RadiusampCompSearch'
    });
});
