define [
  'require'
  'jquery'
  'underscore'
  'Backbone'
  'commandInitiator/Abstract'
], ( require, $, _, Backbone ) ->
  AbstractCommandInitiator = require 'commandInitiator/Abstract'
  
  return Backbone.Model.extend _.extend
    name: 'pqmvcmodel'
    commands: {}
  , AbstractCommandInitiator