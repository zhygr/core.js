/*!
 * Copyright (c) 2012 Andrew Volkov <hello@vol4ok.net>
 */

(function($) {

  $.slice   = Array.prototype.slice;
  $.hasProp = $.hasOwnProperty = Object.prototype.hasOwnProperty;
  $.indexOf = Array.prototype.indexOf;
  
  $.bind = function(func, context) {
    return Function.prototype.bind.apply(func, slice.call(arguments, 1));
  };

  $.extend = function(target) {
    $.slice.call(arguments, 1).forEach(function(source) {
      for (key in source) target[key] = source[key];
    });
    return target;
  }

  $.ext = function() {
    $.extend.apply(this, [this].concat($.slice.call(arguments)) );
  }

  $.inherit = function(child, parent) {
    for (var key in parent) {
      if ($.hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  
  $.ns = function(scopes, block) {
    var i, len, item;
    if (!$.m) $.m = {}
    exports = {};
    block(exports);
    for (i = 0, len = scopes.length; i < len; i++)
      $.m[scopes[i]] = exports;
    return exports
  };
  
  $.require = function(module) {
    return $.m[module];
  }

})(exports);
