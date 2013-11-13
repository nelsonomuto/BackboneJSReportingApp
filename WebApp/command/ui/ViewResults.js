var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['require', 'jquery', 'underscore', 'Backbone', 'command/ui/Base', 'views/result/Preview'], function(require, $, _, Backbone) {
  var BaseUiCommand, ViewResultsCommand;
  BaseUiCommand = require('command/ui/Base');
  ViewResultsCommand = (function(_super) {

    __extends(ViewResultsCommand, _super);

    function ViewResultsCommand() {
      return ViewResultsCommand.__super__.constructor.apply(this, arguments);
    }

    ViewResultsCommand.prototype.commandName = 'ViewResults';

    ViewResultsCommand.prototype.commandView = 'views/result/Results';

    ViewResultsCommand.prototype.commands = {};

    ViewResultsCommand.prototype.processInput = function(parameters) {};

    ViewResultsCommand.prototype.doRun = function() {
      var me;
      return me = this;
    };

    return ViewResultsCommand;

  })(BaseUiCommand);
  return ViewResultsCommand;
});
