
function result (isAllowed, callback = false) {
  if (isAllowed && callback) callback.call(window, screenSize());
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
  const numberRatio = width / height;
  const stringRatio = number_to_ratio(numberRatio);
  const orientation = numberRatio > 1 ? 'landscape' : 'portrait';

  return {
    width,
    height,
    orientation,
    ratio: {
      number: numberRatio,
      string: stringRatio,
    }
  };
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
function doubleValue ({
  queryTemplate,
  sizeOne,
  sizeTwo,
  dimension,
  MQ_instance
}) {

  check_second_value(sizeOne, sizeTwo, dimension);

  const sizes = [
    checkBP(sizeOne, MQ_instance.bp),
    checkBP(sizeTwo, MQ_instance.bp),
  ];

  const largeSize = Math.max(...sizes);
  const smallSize = Math.min(...sizes);

  // Un-comment to debug
  // console.log({largeSize, smallSize})

  return MQ_instance.checkMQ({ queryTemplate, largeSize, smallSize });
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

//http://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/
function number_to_ratio(x) {
	var tolerance = 1.0E-6;
	var h1=1; var h2=0;
	var k1=0; var k2=1;
	var b = x;
	do {
			var a = Math.floor(b);
			var aux = h1; h1 = a*h1+h2; h2 = aux;
			aux = k1; k1 = a*k1+k2; k2 = aux;
			b = 1/(b-a);
	} while (Math.abs(x-h1/k1) > x*tolerance);

	return h1+" / "+k1;
}


exports.result = result;
exports.screenWidth = screenWidth;
exports.screenHeight = screenHeight;
exports.screenSize = screenSize;
exports.checkBP = checkBP;
exports.doubleValue = doubleValue;
exports.check_second_value = check_second_value;
exports.number_to_ratio = number_to_ratio;
