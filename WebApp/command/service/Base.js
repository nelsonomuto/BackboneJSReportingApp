var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['command/AbstractCommand'], function() {
  var AbstractCommand, BaseServiceCommand;
  AbstractCommand = require('command/AbstractCommand');
  BaseServiceCommand = (function(_super) {

    __extends(BaseServiceCommand, _super);

    function BaseServiceCommand() {
      return BaseServiceCommand.__super__.constructor.apply(this, arguments);
    }

    BaseServiceCommand.prototype.commandName = 'Base Service Command';

    BaseServiceCommand.prototype.commandModelPath = '';

    BaseServiceCommand.prototype.doRun = function(deferred) {};

    BaseServiceCommand.prototype.getCommandModelInstance = function() {
      return this.App.getModelInstanceByPath(this.commandModelPath);
    };

    return BaseServiceCommand;

  })(AbstractCommand);
  return BaseServiceCommand;
});
