
define(['require', 'jquery', 'underscore', 'commandInitiator/Abstract'], function(require, $, _) {
  var AbstractCommand, AbstractCommandInitiator, commandInitiatorMixin;
  AbstractCommandInitiator = require('commandInitiator/Abstract');
  commandInitiatorMixin = new AbstractCommandInitiator();
  AbstractCommand = (function() {

    AbstractCommand.prototype.commandName = 'AbstractCommand';

    AbstractCommand.prototype.commands = {};

    function AbstractCommand(parameters) {
      this.parameters = parameters;
      _.extend(this, commandInitiatorMixin, {
        commands: this.commands
      });
      if (!(this.parameters != null)) {
        this.parameters = {
          App: window.App
        };
      } else {
        this.parameters.App = window.App;
      }
      this.App = window.App;
      try {
        this.processInput();
      } catch (error) {
        this.log({
          msg: 'AbstractCommand#processInput Error: ' + this.commandName,
          error: error,
          dump: {
            command: this,
            parameters: this.parameters,
            processInput: this.processInput
          }
        });
      }
    }

    AbstractCommand.prototype.processInput = function() {};

    AbstractCommand.prototype.log = function(args) {
      return this.App.log(args);
    };

    AbstractCommand.prototype.run = function() {
      this.deferred = $.Deferred();
      this.log({
        msg: 'AbstractCommand#run DEFERRED START: ' + this.commandName,
        dump: {
          command: this,
          parameters: this.parameters,
          doRun: this.doRun
        }
      });
      try {
        return this.doRun();
      } catch (error) {
        return this.log({
          msg: 'AbstractCommand#run error: ' + this.commandName,
          error: error,
          dump: {
            command: this,
            parameters: this.parameters,
            doRun: this.doRun
          }
        });
      } finally {
        return this.deferred.promise();
      }
    };

    AbstractCommand.prototype.doRun = function() {};

    AbstractCommand.prototype.resolve = function(value) {
      this.deferred.resolve(value);
      return this.log({
        msg: 'AbstractCommand#run DEFERRED RESOLVED: ' + this.commandName,
        dump: {
          resolvedWith: value,
          command: this,
          parameters: this.parameters,
          doRun: this.doRun
        }
      });
    };

    AbstractCommand.prototype.reject = function(value) {
      this.deferred.reject(value);
      return this.log({
        msg: 'AbstractCommand#run DEFERRED REJECTED: ' + this.commandName,
        dump: {
          rejectedWith: value,
          command: this,
          parameters: this.parameters,
          doRun: this.doRun
        }
      });
    };

    return AbstractCommand;

  })();
  return AbstractCommand;
});
