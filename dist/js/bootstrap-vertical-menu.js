/*!
  * Bootstrap Vertical Menu v0.0.3 (https://iqbalfn.github.io/bootstrap-vertical-menu/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-vertical-menu/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global['bootstrap-vertical-menu'] = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'vertmenu';
  var VERSION = '0.0.3';
  var DATA_KEY = 'bs.vertmenu';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var Default = {
    toggle: false
  };
  var DefaultType = {
    toggle: 'boolean'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed',
    MENU: 'vertical-menu',
    MENU_PARENT: 'vertical-menu-parent',
    SHOW: 'show'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="vertical-menu"]',
    MENU: "." + ClassName.MENU
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var VerticalMenu =
  /*#__PURE__*/
  function () {
    function VerticalMenu(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._parent = element.parentNode;
      if (this._config.toggle) this.toggle();
    } // Getters


    var _proto = VerticalMenu.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._parent).hasClass(ClassName.SHOW)) this.hide();else this.show();
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) return;
      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) return;
      var dimension = 'height';
      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;
      $(this._parent).addClass(ClassName.SHOW);
      this._isTransitioning = true;

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE);
        _this._element.style[dimension] = '';
        _this._isTransitioning = false;
        $(_this._element).trigger(Event.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._parent).hasClass(ClassName.SHOW)) return;
      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) return;
      var dimension = 'height';
      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE);
      this._isTransitioning = true;

      var complete = function complete() {
        _this2._isTransitioning = false;
        $(_this2._parent).removeClass(ClassName.SHOW);
        $(_this2._element).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    } // Static
    ;

    VerticalMenu._handleDownKey = function _handleDownKey(event) {
      //   a
      //      b
      //          c <--           ( you're here )
      //              d           ( 1 )
      //              d1
      //              d2
      //          c1              ( 2 )
      //          c2
      //      b1                  ( 3 )
      //      b2
      //   a1                     ( 4 )
      //   a2
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName.SHOW);
      var next; // ( 1 )

      if (siblingUl && parentOpen) next = $(parent).find('> ul >li:first-child > a').get(0); // ( 2,3,4 )

      if (!next) {
        // let find next menu item
        var cTarget = target;

        while (true) {
          var cParent = cTarget.parentNode; // li

          var CPNext = cParent.nextElementSibling; // li:next

          if (CPNext) {
            next = $(CPNext).children('a').get(0);
            break;
          }

          var cPParent = cParent.parentNode; // ul

          var cPPLi = cPParent.parentNode; // li?

          if (cPPLi.tagName != 'LI' || cPPLi.classList.contains(ClassName.MENU)) break;
          cTarget = $(cPPLi).children('a').get(0);
          if (cTarget) continue;
          break;
        }
      }

      if (next) next.focus();
      return true;
    };

    VerticalMenu._handleLeftKey = function _handleLeftKey(event) {
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName.SHOW);

      if (siblingUl && parentOpen) {
        target.click();
      } else {
        var gParent = parent.parentNode.parentNode;
        if (gParent.classList.contains(ClassName.MENU_PARENT)) $(gParent).children('a').focus();
      }

      return true;
    };

    VerticalMenu._handleRightKey = function _handleRightKey(event) {
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName.SHOW);
      if (siblingUl && !parentOpen) target.click();
      return true;
    };

    VerticalMenu._handleUpKey = function _handleUpKey(event) {
      //   a
      //   a1                             ( 5 )
      //      b
      //      b1
      //      b2                          ( 4 )
      //          c
      //          c1
      //          c2                      ( 3 )
      //              d
      //              d1
      //              d2                  ( 2 )
      //   a2                             ( 1 )
      //   a3                 <!--        ( you're here )
      var target = event.target; // a

      var parent = target.parentNode; // li

      var prev;
      var prevParent = parent.previousElementSibling;

      if (prevParent) {
        var hasChildren = prevParent.classList.contains(ClassName.MENU_PARENT);
        var isOpen = prevParent.classList.contains(ClassName.SHOW);

        if (hasChildren && isOpen) {
          var nextParent = prevParent;

          while (true) {
            var nextPUl = $(nextParent).children('ul').get(0);
            var lastNPUlLI = nextPUl.lastElementChild;
            if (!lastNPUlLI) break;

            var _hasChildren = lastNPUlLI.classList.contains(ClassName.MENU_PARENT);

            var _isOpen = lastNPUlLI.classList.contains(ClassName.SHOW);

            if (!_hasChildren || !_isOpen) {
              prev = $(lastNPUlLI).children('a').get(0);
              break;
            }

            nextParent = lastNPUlLI;
          }
        } else {
          prev = $(prevParent).children('a').get(0);
        }
      } else {
        var pParent = parent.parentNode; // ul

        var pPLi = pParent.parentNode; // li

        if (pPLi.tagName === 'LI' && !pPLi.classList.contains(ClassName.MENU)) prev = $(pPLi).children('a');
      }

      if (prev) prev.focus();
      return true;
    };

    VerticalMenu._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      var prevent = false;

      switch (event.keyCode) {
        case ARROW_DOWN_KEYCODE:
          prevent = VerticalMenu._handleDownKey(event);
          break;

        case ARROW_LEFT_KEYCODE:
          prevent = VerticalMenu._handleLeftKey(event);
          break;

        case ARROW_RIGHT_KEYCODE:
          prevent = VerticalMenu._handleRightKey(event);
          break;

        case ARROW_UP_KEYCODE:
          prevent = VerticalMenu._handleUpKey(event);
          break;
      }

      if (prevent) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    VerticalMenu._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

        if (_config.toggle && _config.toggle === 'vertical-menu') _config.toggle = false;
        if (!data && _config.toggle && /show|hide/.test(config)) _config.toggle = false;

        if (!data) {
          data = new VerticalMenu(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') throw new TypeError("No method named \"" + config + "\"");
          data[config]();
        }
      });
    };

    _createClass(VerticalMenu, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return VerticalMenu;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var $target = $trigger.next('ul');

    VerticalMenu._jQueryInterface.call($target, 'toggle');
  });
  $(document).on(Event.KEYDOWN_DATA_API, Selector.MENU, VerticalMenu._dataApiKeydownHandler);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = VerticalMenu._jQueryInterface;
  $.fn[NAME].Constructor = VerticalMenu;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return VerticalMenu._jQueryInterface;
  };

  exports.VerticalMenu = VerticalMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap-vertical-menu.js.map
