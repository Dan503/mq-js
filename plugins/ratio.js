
var MQ = require('../index');
var { result, check_second_value, number_to_ratio } = require('../_common');

// format = " 2 / 1 "; width / height (spaces optional)
const ratio_regex = /^\s*([0-9\.]+)\s*?\/\s*?([0-9\.]+)\s*$/;

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
		number: ()=> isNumber ? ratio : calculate(ratio),
		string: ()=> !isNumber ? ratio : number_to_ratio(ratio),
	};
	return styles[style]();
}

function calculate(ratio){
	if (is_ratio(ratio)){
		const regResult = ratio_regex.exec(ratio);
		return regResult[1] / regResult[2];
	}
	return ratio
}

function is_ratio(ratio) {
	// format = " 2 / 1 "; width / height (spaces optional)
	const isRatio = typeof ratio === 'string' && !ratio_regex.test(ratio);

	if (!isRatio && !is_number(ratio)){
		invalid(ratio)
	}

	return isRatio;
}

function is_number(ratio) {
	const isNumber = typeof ratio === 'number';

	if (!isNumber && !is_ratio(ratio)) {
		invalid(ratio);
	}

	return isNumber;
}

function invalid(ratio){
	throw new Error(`"${ratio}" must be either a number or a string in the format "[width] / [height]"`);
}
