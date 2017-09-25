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

  minHeight(size, callback){
    return result(
      screenHeight() > this.checkBP(size),
      callback
    );
  }

  maxHeight(size, callback){
    return result(
      screenHeight() <= this.checkBP(size),
      callback
    );
  }

  ratio(ratio, callback){
    return result(
      checkRatio(ratio, 'exact'),
      callback
    );
  }

  minRatio(ratio, callback){
    return result(
      checkRatio(ratio, 'min'),
      callback
    );
  }

  maxRatio(ratio, callback){
    return result(
      checkRatio(ratio, 'max'),
      callback
    );
  }

  orientation(orientation, callback){
    return result(
      checkOrientation(orientation),
      callback
    );
  }

  inside(large, small, callback){
    return result(
      inside(large, small, 'width', this.bp),
      callback
    );
  }
  //inside alias
  insideWidth(large, small, callback){
    return this.inside(large, small, callback);
  }

  outside(large, small, callback){
    return result(
      !inside(large, small, 'width', this.bp),
      callback
    );
  }
  //outside alias
  outsideWidth(large, small, callback){
    return this.outside(large, small, callback);
  }

  insideHeight(large, small, callback){
    return result(
      inside(large, small, 'height', this.bp),
      callback
    );
  }

  outsideHeight(large, small, callback){
    return result(
      !inside(large, small, 'height', this.bp),
      callback
    );
  }

}

function result (isAllowed, callback = ()=>{}) {
  if (isAllowed) callback.call(window, screenSize());
  return isAllowed;
}

function screenWidth () {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function screenHeight () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function screenSize(){
  return { width: screenWidth(), height: screenHeight() };
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

  const dimensions = screenSize();

  const screen_dimension = dimensions[dimension];

  if (!screen_dimension){
    throw new Error(`invalid direction: "${direction}"; valid directions are: ${Object.keys(dimensions)}`);
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

function checkRatio(ratio, style) {
  const ratios = getRatios(ratio);
  return {
    exact: ()=> ratios.converted === ratios.screen,
    min: ()=> ratios.converted > ratios.screen,
    max: ()=> ratios.converted <= ratios.screen,
  }[style];
}

function exactRatioCheck (ratio) {
  const ratios = getRatios(ratio);
  return ratios.converted === ratios.screen;
}

function minRatio () {
  return ratios.converted === ratios.screen;

}

function getRatios (ratio) {
  const { width, height } = screenSize();

  return {
    converted: convertRatio(ratio),
    screen: width / height,
  }
}

function convertRatio (ratio) {
  if (typeof ratio !== 'number' || typeof ratio !== 'string' || !ratio.match(/[0-9\.]+\s*?\/\s*?[0-9\.]+/)) {
    throw new Error(`"${ratio}" must be either a number or a string in the format "[width] / [height]"`);
  }

  if (typeof ratio === 'number') {
    return ratio;
  } else {
    return eval(ratio);
  }
}

function checkOrientation (orientation) {
  const { width, height } = screenSize();

  const orientations = {
    portrait: ()=> width < height,
    landscape: ()=> width > height,
    square: ()=> width === height,
  }

  if (!orientations[orientation]) throw new Error(`"${orientation}" not supported, valid orientations: ${Object.keys(orientations)}`);

  return orientations[orientation]();
}

export default MQ;
