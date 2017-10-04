'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function result(isAllowed) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (isAllowed) callback.call(window, screenSize());
  return isAllowed;
}

function screenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function screenHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function screenSize() {
  var width = screenWidth();
  var height = screenHeight();
  var ratio = width / height;
  return { width: width, height: height, ratio: ratio };
}

//Checks if the size is a valid breakpoint value
function checkBP(size, breakpoints) {
  if (typeof size === 'string') {
    if (typeof breakpoints[size] !== 'undefined') {
      return breakpoints[size];
    } else {
      console.log('Available Breakpoints:', breakpoints);
      throw new Error('"' + size + '" breakpoint does not exist');
    }
  } else if (typeof size === 'number') {
    return size;
  } else {
    console.log('Available Breakpoints:', breakpoints);
    throw new Error('"' + size + '" is not a valid breakpoint. It must be a string or a number');
  }
}

// Test if current screen size is between 2 values
function inside(largeSize, smallSize, dimension, breakpoints) {

  var screen_dimension = screenSize()[dimension];

  if (!screen_dimension) {
    throw new Error('invalid direction: "' + direction + '"; valid directions are: ' + Object.keys(dimensions));
  }

  largeSize = checkBP(largeSize, breakpoints);
  smallSize = checkBP(smallSize, breakpoints);

  //If smallest is first, it swaps the values around
  if (largeSize < smallSize) {
    var tmp = largeSize;
    largeSize = smallSize;
    smallSize = tmp;
  }

  return smallSize < screen_dimension && screen_dimension <= largeSize;
}

exports.result = result;
exports.screenWidth = screenWidth;
exports.screenHeight = screenHeight;
exports.screenSize = screenSize;
exports.checkBP = checkBP;
exports.inside = inside;