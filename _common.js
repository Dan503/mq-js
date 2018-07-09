
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
      console.error('Available Breakpoints:', breakpoints);
      throw new Error(`"${size}" breakpoint does not exist`);
    }
  } else if (typeof size === 'number') {
    return size;
  } else {
    console.error('Available Breakpoints:', breakpoints);
    throw new Error(`"${size}" is not a valid breakpoint. It must be a string or a number`);
  }
}

// Test if current screen size is between 2 values
function inside (largeSize, smallSize, dimension, MQ_instance) {

  check_second_value(largeSize, smallSize, dimension);

  const screen_size = screenSize();
  const screen_dimension = screen_size[dimension];

  if (!screen_dimension){
    throw new Error(`invalid dimension: "${dimension}"; valid dimensions are: ${Object.keys(screen_size)}`);
  }

  largeSize = checkBP(largeSize, MQ_instance.breakpoints);
  smallSize = checkBP(smallSize, MQ_instance.breakpoints);

  //If smallest is first, it swaps the values around
  if (largeSize < smallSize){
    const tmp = largeSize;
    largeSize = smallSize;
    smallSize = tmp;
  }

  return smallSize < screen_dimension && screen_dimension <= largeSize;
}

function second_property_is_invalid (secondProperty) {
  const type = typeof secondProperty;
  const isInvalid = ['function','undefined'].indexOf(type) > -1;
  return isInvalid;
}

function check_second_value(propOne, propTwo, dimension){
  if (second_property_is_invalid(propTwo)){
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

  Currently only the "${propOne}" breakpoint is defined.
  The other breakpoint is coming through as "${propTwo}".

  Please use this format:
  ${message('\n', '[breakpoint-1], [breakpoint-2], [optional-callback-function]')}
  `)
  }
}


exports.result = result;
exports.screenWidth = screenWidth;
exports.screenHeight = screenHeight;
exports.screenSize = screenSize;
exports.checkBP = checkBP;
exports.inside = inside;
exports.check_second_value = check_second_value;
