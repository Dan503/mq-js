
var MQ = require('../index');
var { result, screenSize, inside, check_second_value } = require('../_common');

MQ.prototype.ratio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'exact'),
		callback
	);
}

MQ.prototype.minRatio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'min'),
		callback
	);
}

MQ.prototype.maxRatio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'max'),
		callback
	);
}

MQ.prototype.insideRatio = function (one, two, callback){
	return result(
		insideRatio(one, two),
		callback
	)
}

MQ.prototype.outsideRatio = function (one, two, callback){
	return result(
		outsideRatio(one, two),
		callback
	);
}

function checkRatio (ratio, style) {
	const stringRatio = convert_to('string', ratio);
	return {
		exact: ()=> window.matchMedia(`(aspect-ratio: ${stringRatio})`).matches,
		min: ()=> window.matchMedia(`(min-aspect-ratio: ${stringRatio})`).matches,
		max: ()=> window.matchMedia(`(max-aspect-ratio: ${stringRatio})`).matches,
	}[style]();
}

function insideRatio (ratio_one, ratio_two) {
	check_second_value(ratio_one, ratio_two, 'ratio');
	const sortedRatios = get_sorted_string_ratios(ratio_one, ratio_two);
	return window.matchMedia(`(min-aspect-ratio: ${sortedRatios.small}) and (max-aspect-ratio: ${sortedRatios.large})`).matches;
}

function outsideRatio (ratio_one, ratio_two) {
	check_second_value(ratio_one, ratio_two, 'ratio');
	const sortedRatios = get_sorted_string_ratios(ratio_one, ratio_two);
	return window.matchMedia(`(max-aspect-ratio: ${sortedRatios.small}), (min-aspect-ratio: ${sortedRatios.large})`).matches;
}

function get_sorted_string_ratios(ratio_one, ratio_two){
	const stringRatios = [
		convert_to('string', ratio_one),
		convert_to('string', ratio_two),
	]
	return sort_ratios(...stringRatios);
}

function sort_ratios(ratio_one, ratio_two){
	const numberOne = convert_to('number', ratio_one);
	const numberTwo = convert_to('number', ratio_two);

	if (numberOne < numberTwo) {
		return {
			large: ratio_two,
			small: ratio_one,
		}
	}

	return {
		large: ratio_one,
		small: ratio_two,
	}
}

function convert_to (style, ratio) {
	const isNumber = is_number(ratio);
	const styles = {
		number: ()=> isNumber ? ratio : eval(ratio),
		string: ()=> !isNumber ? ratio : number_to_ratio(ratio),
	};
	return styles[style]();
}

function is_number (ratio) {
	const isNumber = typeof ratio === 'number';
	// format = "1 / 2";
	const isFormattedString = typeof ratio === 'string' && !ratio.match(/[0-9\.]+\s*?\/\s*?[0-9\.]+/);

	if (!isNumber && !isFormattedString) {
		throw new Error(`"${ratio}" must be either a number or a string in the format "[width] / [height]"`);
	}

	return isNumber;
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

	return h1+"/"+k1;
}
