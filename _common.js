
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
  const width = screenWidth();
  const height = screenHeight();
  const ratio = width / height;
  return { width, height, ratio };
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

  if (second_property_is_invalid(smallSize)){

    const message = (divider = ' and ', extra = '') => {
      const dimensionFunctions = {
        'width' : `mq.inside(${extra})${divider}mq.outside(${extra})`,
        'height' : `mq.insideHeight(${extra})${divider}mq.outsideHeight(${extra})`,
        'ratio' : `mq.insideRatio(${extra})${divider}mq.outsideRatio(${extra})`,
      }
      return dimensionFunctions[dimension];
    }

    throw new Error(`

The ${message()} functions require two breakpoints to be defined.

Currently only the "${largeSize}" breakpoint is defined.
The other breakpoint is coming through as "${smallSize}".

Please use this format:
${message('\n', '[breakpoint-1], [breakpoint-2], [optional-callback-function]')}
`)
  }

  const screen_dimension = screenSize()[dimension];

  if (!screen_dimension){
    throw new Error(`invalid direction: "${direction}"; valid directions are: ${Object.keys(dimensions)}`);
  }

  largeSize = checkBP(largeSize, breakpoints);
  smallSize = checkBP(smallSize, breakpoints);

  //If smallest is first, it swaps the values around
  if (largeSize < smallSize){
    const tmp = largeSize;
    largeSize = smallSize;
    smallSize = tmp;
  }

  return smallSize < screen_dimension && screen_dimension <= largeSize;
}

function second_property_is_invalid (secondProperty, breakpoints) {
  const type = typeof secondProperty;
  const isInvalid = ['function','undefined'].indexOf(type) > -1;
  return isInvalid;
}

Object.assign(exports, { result, screenWidth, screenHeight, screenSize, checkBP, inside })