// Generated by CoffeeScript 1.10.0

/**
  * microTK - v0.0.3
  *
  * @author Todd Henderson <todd@todd-henderson.me>
  * @license The MIT License (MIT)
  * @copyright Copyright (c) 2014-2016 Todd Henderson
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
 */


/**
  * This action is triggered when the conditions are met.
  * 
  * @callback elementAction
  * @param {HTMLElement} element
 */


/**
  * Creates a new instance of MicroTK with specified query paremeters or element(s)
  *
  * @function microTK
  * @param {string|HTMLElement} selector - The selector to be queried for or the HTMLElement(s) to be added.
  * @param {HTMLElement} [scope=document] - The scope of the query selection.
  * @returns {microTK} An instance of the MicroTK object.
  * @public
  * @example
  * var menu = µ("#menu");
 */

(function() {
  var MicroTK, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;


  /**
    * The main class of the microTK library, it is a list of selected HTMLElement 
    * that various actions be performed on.
    * 
    * @class MicroTK
   */

  MicroTK = (function() {
    function MicroTK(selector, scope) {
      var _node, _nodelist, i, j, k, key, len, len1, len2, node;
      if (scope == null) {
        scope = root.document;
      }

      /**
        * @member int length - The current number of selected elements.
       */
      this.length = 0;

      /**
        * @member string version - The current version.
       */
      this.version = 'v0.0.3-pre';
      if (!selector) {
        return;
      }
      if (typeof result === 'string') {
        selector = selector.trim();
      }
      if (selector instanceof Element) {
        this[0] = selector;
        this.length = 1;
      } else if (selector.slice(0, selector.length) === '#' && selector.indexOf(" " === -1 && selector.indexOf("." === -1))) {
        _node = scope.getElementById(selector.replace(/\#/g, ""));
        if (_node != null) {
          this[0] = _node;
          this.length = 1;
        }
      } else if (selector.slice(0, selector.length) === "." && selector.indexOf("#" === -1 && selector.indexOf(":" === -1 && selector.indexOf(" " === -1)))) {
        _nodelist = scope.getElementsByClassName(selector.replace(/\./g, " "));
        this.length = 0;
        if (_nodelist != null) {
          for (key = i = 0, len = _nodelist.length; i < len; key = ++i) {
            node = _nodelist[key];
            this[key] = node;
            this.length++;
          }
        }
      } else if (/^[a-zA-Z]+$/.test(selector)) {
        _nodelist = scope.getElementsByTagName(selector);
        this.length = 0;
        if (_nodelist != null) {
          for (key = j = 0, len1 = _nodelist.length; j < len1; key = ++j) {
            node = _nodelist[key];
            this[key] = node;
            this.length++;
          }
        }
      } else {
        _nodelist = scope.querySelectorAll(selector);
        this.length = 0;
        if (_nodelist != null) {
          for (key = k = 0, len2 = _nodelist.length; k < len2; key = ++k) {
            node = _nodelist[key];
            this[key] = node;
            this.length++;
          }
        }
      }
    }


    /**
      * Adds an attribute to the selected elements.
      *
      * @param {string} name - The attribute to be added.
      * @param {string} value - The value of the attribute.
      * @returns {MicroTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").addAttribute("title", "test");
     */

    MicroTK.prototype.addAttribute = function(name, value) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        _element.setAttribute(name, value);
      }
      return this;
    };


    /**
      * Adds a class to the selected elements.
      *
      * @param {string} className - The class to be added.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").addClass("active");
     */

    MicroTK.prototype.addClass = function(className) {
      var _element, i, len, ref;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element != null) {
          if ((ref = _element.classList) != null) {
            ref.add(className);
          }
        }
      }
      return this;
    };


    /**
      * Adds an event to the selected elements.
      *
      * @param {string} event - Event to be added.
      * @param {function} action - Function to be run on event.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").addEvent("click", function (e){
      *     µ(e).toggleClass("active");   
      * });
     */

    MicroTK.prototype.addEvent = function(event, action) {
      var _contains, _element, base, i, len, ref;
      _contains = function(object, value) {
        var i, item, len;
        if (object != null) {
          for (i = 0, len = object.length; i < len; i++) {
            item = object[i];
            if (item = value) {
              return true;
            }
          }
        }
        return false;
      };
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (!_contains(_element != null ? (ref = _element._mtk) != null ? ref.actions : void 0 : void 0, {
          event: event,
          action: action
        })) {
          if ((_element != null ? _element.addEventListener : void 0) != null) {
            _element.addEventListener(event, action, false);
          } else if ((_element != null ? _element.attachEvent : void 0) != null) {
            _element.attachEvent("on" + event, action);
          } else {
            _element["on" + event] = action;
          }
          if (_element._mtk == null) {
            _element._mtk = {};
          }
          if ((base = _element._mtk).actions == null) {
            base.actions = [];
          }
          _element._mtk.actions.push;
        }
      }
      return this;
    };


    /**
      * Appends an HTMLElement into the selected elements.
      *
      * @param {HTMLElement} element - Element to be removed.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * var element = document.createElement("div")
      * µ("#menu").append(element);
     */

    MicroTK.prototype.append = function(element) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element != null) {
          _element.appendChild(element.cloneNode(true));
        }
      }
      return this;
    };


    /**
      * Performs an action on the selected elements
      *
      * @param {elementAction} action - Function to be run when the element has providec class.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").each(function (e){
      *     e.classList.add("active");   
      * });
     */

    MicroTK.prototype.each = function(action) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        action(_element);
      }
      return this;
    };


    /**
      * Checks to see if elements contains provided class and performs provided action.
      *
      * @param {string} name - The attribute to be added.
      * @param {elementAction} action - Function to be run when the element has provided attribute.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").hasAttribute("title", function (e){
      *     e.title = "woohoo"; 
      * });
     */

    MicroTK.prototype.hasAttribute = function(name, action) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element.hasAttribute(name)) {
          action(_element);
        }
      }
      return this;
    };


    /**
      * Checks to see ff elements contains provided class and performs provided action.
      *
      * @param {string} className - Element to be tested for.
      * @param {elementAction} action - Function to be run when the element has providec class.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").hasClass("active", function (e){
      *     e.classList.remove("active");   
      * });
     */

    MicroTK.prototype.hasClass = function(className, action) {
      var _element, i, len, ref;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element != null ? (ref = _element.classList) != null ? ref.contains(className) : void 0 : void 0) {
          action(_element);
        }
      }
      return this;
    };


    /**
      * Prepends an HTMLElement into the selected elements.
      *
      * @param {HTMLElement} element - Element to be removed.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * var element = document.createElement("div")
      * µ("#menu").prepend(element);
     */

    MicroTK.prototype.prepend = function(element) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element.firstChild != null) {
          _element.insertBefore(element.cloneNode(true), _element.firstChild);
        } else {
          _element.appendChild(element.cloneNode(true));
        }
      }
      return this;
    };


    /**
      * Removes the selected elements from the DOM.
      *
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").remove();
     */

    MicroTK.prototype.remove = function() {
      var _element, i, key, len;
      for (key = i = 0, len = this.length; i < len; key = ++i) {
        _element = this[key];
        if (_element.remove) {
          _element.remove();
          delete this[key];
          this.length--;
        } else {
          _element.parentElement.removeChild(_element);
          delete this[key];
          this.length--;
        }
      }
      return this;
    };


    /**
      * Removes an attribute from the selected elements.
      *
      * @param {string} name - The attribute to be added.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").removeAttribute("id");
     */

    MicroTK.prototype.removeAttribute = function(name) {
      var _element, i, len;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        _element.removeAttribute(name);
      }
      return this;
    };


    /**
      * Removes a class from the selected elements.
      *
      * @param {string} className - Class to be removed.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").removeClass("active");
     */

    MicroTK.prototype.removeClass = function(className) {
      var _element, i, len, ref;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element != null) {
          if ((ref = _element.classList) != null) {
            ref.remove(className);
          }
        }
      }
      return this;
    };


    /**
      * Toggles a class in selected elements.
      *
      * @param {string} className - Class to be toggled.
      * @returns {microTK} A copy of the MicroTK object.
      * @public
      * @example
      * µ("#menu").toggleClass("active");
     */

    MicroTK.prototype.toggleClass = function(className) {
      var _element, i, len, ref;
      for (i = 0, len = this.length; i < len; i++) {
        _element = this[i];
        if (_element != null) {
          if ((ref = _element.classList) != null) {
            ref.toggle(className);
          }
        }
      }
      return this;
    };

    return MicroTK;

  })();

  root.MicroTK = MicroTK;

  root.µ = root.microTK = function(selector, scope) {
    return new MicroTK(selector, scope);
  };

}).call(this);
