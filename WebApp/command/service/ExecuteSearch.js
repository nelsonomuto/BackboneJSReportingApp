var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['require', 'jquery', 'underscore', 'Backbone', 'command/service/Base'], function(require, $, _, Backbone) {
  var ExecuteSearchCommand, ServiceCommand;
  ServiceCommand = require('command/service/Base');
  ExecuteSearchCommand = (function(_super) {

    __extends(ExecuteSearchCommand, _super);

    function ExecuteSearchCommand() {
      return ExecuteSearchCommand.__super__.constructor.apply(this, arguments);
    }

    ExecuteSearchCommand.prototype.commandName = 'ExecuteSearchCommand';

    ExecuteSearchCommand.prototype.commandModelPath = null;

    ExecuteSearchCommand.prototype.processInput = function() {
      this.commandModelPath = this.parameters.searchModelPath;
      return this.parameters.model = this.getCommandModelInstance();
    };

    ExecuteSearchCommand.prototype.doRun = function() {
      var me, model;
      me = this;
      model = this.parameters.model;
      model.loadFromView({
        selector: this.parameters.viewSelector
      });
      this.App.currentModel = this.parameters.model;
      return model.query({
        success: function(results, code, data) {
          return me.resolve(model);
        },
        error: function() {
          return me.reject('Error model#query');
        }
      });
    };

    return ExecuteSearchCommand;

  })(ServiceCommand);
  return ExecuteSearchCommand;
});
