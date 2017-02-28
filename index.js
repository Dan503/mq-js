"use strict";

//designed to be used in an if statement like:
// works with the bp breakpoint object /_scripts/config/bp-break-points.js
//if (mq.min(bp('tablet') + 50){ ...functionality... }
//if (mq.inside('tablet', 'mobile'){ ...functionality... }
//can also be used like mq.min('tablet', (screenWidth)=>{ /* functionality */ });

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function screenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

// function screenHeight(){
//   return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// }

var MQ = function () {
  function MQ(breakpoints) {
    _classCallCheck(this, MQ);

    this.bp = breakpoints;
  }

  //Checks if the size is a valid breakpoint value


  _createClass(MQ, [{
    key: 'checkBP',
    value: function checkBP(size) {
      if (typeof size === 'string') {
        if (typeof this.bp[size] !== 'undefined') {
          return this.bp[size];
        } else {
          console.log('Available Breakpoints:', this.bp);
          throw '"' + size + '" breakpoint does not exist';
        }
      } else if (typeof size === 'number') {
        return size;
      } else {
        console.log('Available Breakpoints:', this.bp);
        throw '"' + size + '" is not a valid breakpoint.\n It must be a string or a number';
      }
    }
  }, {
    key: 'min',
    value: function min(size) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var screen_width = screenWidth();
      size = this.checkBP(size);

      var isAllowed = screen_width > size;

      if (isAllowed) callback.call(window, screen_width);

      return isAllowed;
    }
  }, {
    key: 'max',
    value: function max(size) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var screen_width = screenWidth();
      size = this.checkBP(size);

      var isAllowed = screen_width <= size;

      if (isAllowed) callback.call(window, screen_width);

      return isAllowed;
    }
  }, {
    key: 'inside',
    value: function inside(wideSize, thinSize) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var screen_width = screenWidth();

      wideSize = this.checkBP(wideSize);
      thinSize = this.checkBP(thinSize);

      //If largest is first, it swaps the values around
      if (wideSize < thinSize) {
        var tmp = wideSize;
        wideSize = thinSize;
        thinSize = tmp;
      }

      var isAllowed = thinSize < screen_width && screen_width <= wideSize;

      if (isAllowed) callback.call(window, screen_width);

      return isAllowed;
    }
  }, {
    key: 'outside',
    value: function outside(wideSize, thinSize) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var screen_width = screenWidth();

      var isAllowed = !this.inside(wideSize, thinSize);

      if (isAllowed) callback.call(window, screen_width);

      return isAllowed;
    }
  }]);

  return MQ;
}();

exports.default = MQ;