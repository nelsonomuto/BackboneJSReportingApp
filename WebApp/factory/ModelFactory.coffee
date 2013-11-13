define [
  'jquery'
  'underscore'
  'Backbone'
  'Router'
  'models/result/Result'
  'models/search/QuickSearch'
  'models/search/advanced/Favorites'
  'models/search/advanced/FindMyParcel'
  'models/search/advanced/Geography'
  'models/search/advanced/GetMeClose'
  'models/search/advanced/Maps'
  'models/search/advanced/PastSearches'
  'models/search/advanced/RadiusampCompSearch'
], ( $, _, Backbone, Router ) ->
  class ModelFactory
    @classes: null
    @modelInstances: null
    constructor: ->
      @modelInstances = {}
      @classes = 
        'models/search/QuickSearch': require 'models/search/QuickSearch'
        'models/search/advanced/GetMeClose': require 'models/search/advanced/GetMeClose'
        'models/search/advanced/Geography': require 'models/search/advanced/Geography'
        'models/search/advanced/Maps': require 'models/search/advanced/Maps'
        'models/search/advanced/RadiusampCompSearch': require 'models/search/advanced/RadiusampCompSearch'
        'models/search/advanced/Favorites': require 'models/search/advanced/Favorites'
        'models/search/advanced/PastSearches': require 'models/search/advanced/PastSearches'
            
      for path, cls of @classes
        @modelInstances[path] = new cls()
        
    getInstanceByPath: ( path ) ->
      @modelInstances[path]
      
      
      
        
  return ModelFactory