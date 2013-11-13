var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['require', 'jquery', 'underscore', 'Backbone', 'command/ui/Base', 'views/result/Preview', 'command/service/ExecuteSearch'], function(require, $, _, Backbone) {
  var BaseUiCommand, QuickPreviewCommand;
  BaseUiCommand = require('command/ui/Base');
  QuickPreviewCommand = (function(_super) {

    __extends(QuickPreviewCommand, _super);

    function QuickPreviewCommand() {
      return QuickPreviewCommand.__super__.constructor.apply(this, arguments);
    }

    QuickPreviewCommand.prototype.commandName = 'QuickPreviewCommand';

    QuickPreviewCommand.prototype.commandView = 'views/result/Preview';

    QuickPreviewCommand.prototype.commands = {
      executeSearch: 'command/service/ExecuteSearch'
    };

    QuickPreviewCommand.prototype.processInput = function(parameters) {};

    QuickPreviewCommand.prototype.doRun = function() {
      var me;
      me = this;
      return this.runCommand('executeSearch', {
        searchModelPath: 'models/search/QuickSearch',
        viewSelector: '#Quick'
      }).then(function(model) {
        return me.showView(model, true);
      });
    };

    return QuickPreviewCommand;

  })(BaseUiCommand);
  return QuickPreviewCommand;
});
