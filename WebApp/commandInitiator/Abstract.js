
define(['require'], function(require) {
  var AbstractCommandInitiator;
  AbstractCommandInitiator = (function() {

    function AbstractCommandInitiator() {}

    AbstractCommandInitiator.prototype.commands = {};

    AbstractCommandInitiator.prototype.getCommandClsByPath = function(path) {
      var cls;
      try {
        return cls = require(this.commands[path]);
      } catch (error) {
        return window.App.log({
          msg: 'AbstractCommandInitiator#getCommandClsByPath: ' + path,
          dump: {
            commandInitiator: this,
            path: path
          },
          error: error
        });
      } finally {
        return cls;
      }
    };

    AbstractCommandInitiator.prototype.runCommand = function(commandClsPath, parameters) {
      var command, commandCls;
      commandCls = this.getCommandClsByPath(commandClsPath);
      command = new commandCls(parameters);
      return command.run();
    };

    return AbstractCommandInitiator;

  })();
  return AbstractCommandInitiator;
});
