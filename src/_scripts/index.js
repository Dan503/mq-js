"use strict";

class MQ {
  constructor(breakpoints){
    this.bp = breakpoints;
  }

  checkBP(size){
    return checkBP(size, this.bp);
  }

  min(size, callback) {
    return result(
      screenWidth() > this.checkBP(size),
      callback
    );
  }
  //alias for "min"
  minWidth(size, callback){
    return this.min(size, callback);
  }

  max(size, callback){
    return result(
      screenWidth() <= this.checkBP(size),
      callback
    );
  }
  //alias for "max"
  maxWidth(size, callback){
    return this.max(size, callback);
  }

  inside(wideSize, thinSize, callback){
    return result(
      inside(wideSize, thinSize, 'w', this.bp),
      callback
    );
  }

  outside(wideSize, thinSize, callback){
    return result(
      !inside(wideSize, thinSize, 'w', this.bp),
      callback
    );
  }
}

function result (isAllowed, callback = ()=>{}) {
  const screen_size = { width: screenWidth(), height: screenHeight() };
  if (isAllowed) callback.call(window, screen_size);
  return isAllowed;
}

function screenWidth () {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function screenHeight () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

//Checks if the size is a valid breakpoint value
function checkBP(size, breakpoints){
  if (typeof size === 'string'){
    if (typeof breakpoints[size] !== 'undefined'){
      return breakpoints[size];
    } else {
      console.log('Available Breakpoints:', breakpoints);
      throw new Error(`"${size}" breakpoint does not exist`);
    }
  } else if (typeof size === 'number') {
    return size;
  } else {
    console.log('Available Breakpoints:', breakpoints);
    throw new Error(`"${size}" is not a valid breakpoint. It must be a string or a number`);
  }
}

// Test if current screen size is between 2 values
function inside (largeSize, smallSize, dimension, breakpoints) {
  if (values.length > 2){
    throw new Error('More than 2 values provided to "inside" function: '+values);
  }

  const dimensions = {
    w: screenWidth(),
    h: screenHeight(),
  }

  const screen_dimension = dimensions[dimension];

  if (!screen_dimension){
    throw new Error(`invalid direction: "${direction}"; valid directions are: ${dimensions.keys}`);
  }

  let largeSize = checkBP(largeSize, breakpoints);
  let smallSize = checkBP(smallSize, breakpoints);

  //If smallest is first, it swaps the values around
  if (largeSize < smallSize){
    const tmp = largeSize;
    largeSize = smallSize;
    smallSize = tmp;
  }

  return smallSize < screen_dimension && screen_dimension <= largeSize;
}

export default MQ;
