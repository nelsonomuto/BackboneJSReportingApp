define [
  'require'
  'Backbone'
  'models/result/Result'
], ( require, Backbone, SearchResultModel ) ->
  SearchResultModel = require 'models/result/Result'
  return Backbone.Collection.extend
    model: SearchResultModel