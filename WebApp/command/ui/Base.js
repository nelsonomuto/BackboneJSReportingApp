var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['require', 'jquery', 'command/AbstractCommand'], function(require, $) {
  var AbstractCommand, BaseUiCommand;
  AbstractCommand = require('command/AbstractCommand');
  BaseUiCommand = (function(_super) {

    __extends(BaseUiCommand, _super);

    function BaseUiCommand() {
      return BaseUiCommand.__super__.constructor.apply(this, arguments);
    }

    BaseUiCommand.prototype.commandName = 'Base UI Command';

    BaseUiCommand.prototype.commandView = '';

    BaseUiCommand.prototype.getCommandView = function(params) {
      var viewCls;
      viewCls = require(this.commandView);
      return new viewCls(params);
    };

    BaseUiCommand.prototype.getViews = function() {
      return this.parameters.App.getViews();
    };

    BaseUiCommand.prototype.getCurrentView = function() {
      return this.getViews().current;
    };

    BaseUiCommand.prototype.setCurrentView = function(view) {
      return this.App.setCurrentView(view);
    };

    BaseUiCommand.prototype.hideCurrentView = function(fade, callback) {
      if (fade == null) {
        fade = 200;
      }
      this.log({
        msg: 'command.ui.Base#hideCurrentView',
        dump: {
          command: this,
          fadeOut: fade,
          callback: callback
        }
      });
      return $(this.getCurrentView().el).fadeOut(fade, callback);
    };

    BaseUiCommand.prototype.showViewTest = function() {
      var me;
      me = this;
      this.showView(null, true);
      return setTimeout(function() {
        return me.hideCurrentView();
      }, 900);
    };

    BaseUiCommand.prototype.doRun = function() {
      return this.showViewTest();
    };

    BaseUiCommand.prototype.processInput = function() {};

    BaseUiCommand.prototype.showViewBehavior = {
      fade: {
        currentViewAndHide: function(viewCls, opt) {
          $(this.currentView.el).fadeOut(400, function() {
            this.showOptFn(opt, viewCls);
            this.showViewBehavior.fade.show();
          });
          return false;
        },
        notCurrentViewAndHide: function() {
          return true;
        },
        show: function() {
          $(this.currentView.el).fadeIn(800);
        }
      },
      notFade: {
        currentViewAndHide: function() {
          $(this.currentView.el).hide();
          return true;
        },
        notCurrentViewAndHide: function() {
          return true;
        },
        show: function() {
          $(this.currentView.el).show();
        }
      }
    };

    BaseUiCommand.prototype.showOptFn = function(opt, viewCls) {
      if (opt === true) {
        this.currentView = new viewCls(opt);
      } else {
        this.currentView = new viewCls();
      }
      this.setCurrentView(this.currentView);
      this.currentView.render();
    };

    BaseUiCommand.prototype.showView = function(hideOtherViews, fade, opt) {
      var showBehaviorCurrentViewAndHide, showBehaviorFade, viewCls, _ref;
      viewCls = require(this.commandView);
      if ((typeof views !== "undefined" && views !== null ? (_ref = views.current) != null ? _ref.id : void 0 : void 0) === viewCls.prototype.id) {
        return;
      }
      if (!(fade != null)) {
        fade = true;
      }
      if (!(hideOtherViews != null)) {
        hideOtherViews = true;
      }
      if (!(opt != null)) {
        opt = false;
      }
      if (fade === true) {
        showBehaviorFade = 'fade';
      } else {
        showBehaviorFade = 'notFade';
      }
      if ((this.currentView != null) && hideOtherViews === true) {
        showBehaviorCurrentViewAndHide = 'currentViewAndHide';
      } else {
        showBehaviorCurrentViewAndHide = 'notCurrentViewAndHide';
      }
      console.log('showBehavior', {
        showViewBehavior: this.showViewBehavior,
        fn: this.showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide],
        showBehaviorFade: showBehaviorFade,
        showBehaviorCurrentViewAndHide: showBehaviorCurrentViewAndHide
      });
      if (this.showViewBehavior[showBehaviorFade][showBehaviorCurrentViewAndHide].apply(this, [viewCls, opt]) === true) {
        this.showOptFn(opt, viewCls);
      }
      this.showViewBehavior[showBehaviorFade]['show'].apply(this, []);
    };

    return BaseUiCommand;

  })(AbstractCommand);
  return BaseUiCommand;
});
