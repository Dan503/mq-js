var MQ = require('../index')
var c = require('../_common')
var result = c.result
var check_second_value = c.check_second_value
var number_to_ratio = c.number_to_ratio

// format = " 2 / 1 "; width / height (spaces optional)
var ratio_regex = /^\s*([0-9\.]+)\s*?\/\s*?([0-9\.]+)\s*$/

MQ.prototype.ratio = function (ratio, callback) {
	return result(checkRatio(ratio, 'exact'), callback)
}

MQ.prototype.minRatio = function (ratio, callback) {
	return result(checkRatio(ratio, 'min'), callback)
}

MQ.prototype.maxRatio = function (ratio, callback) {
	return result(checkRatio(ratio, 'max'), callback)
}

MQ.prototype.insideRatio = function (one, two, callback) {
	return result(insideRatio(one, two), callback)
}

MQ.prototype.outsideRatio = function (one, two, callback) {
	return result(outsideRatio(one, two), callback)
}

function checkRatio(ratio, style) {
	check_ratio_validity(ratio)

	var stringRatio = convert_to('string', ratio)
	return {
		exact: function () {
			return window.matchMedia('(aspect-ratio: ' + stringRatio + ')').matches
		},
		min: function () {
			return window.matchMedia('(min-aspect-ratio: ' + stringRatio + ')')
				.matches
		},
		max: function () {
			return window.matchMedia('(max-aspect-ratio: ' + stringRatio + ')')
				.matches
		},
	}[style]()
}

function insideRatio(ratio_one, ratio_two) {
	return doubleValueRatio({
		ratio_one: ratio_one,
		ratio_two: ratio_two,
		queryTemplate:
			'(max-aspect-ratio: {wide}) and (min-aspect-ratio: {thin})',
	})
}

function outsideRatio(ratio_one, ratio_two) {
	return doubleValueRatio({
		ratio_one: ratio_one,
		ratio_two: ratio_two,
		queryTemplate: '(min-aspect-ratio: {wide}), (max-aspect-ratio: {thin})',
	})
}

function doubleValueRatio(opts) {
	var ratio_one = opts.ratio_one
	var ratio_two = opts.ratio_two
	var queryTemplate = opts.queryTemplate

	;[ratio_one, ratio_two].forEach(check_ratio_validity)
	check_second_value(ratio_one, ratio_two, 'ratio')
	var sortedRatios = get_sorted_string_ratios(ratio_one, ratio_two)
	var queryString = queryTemplate
		.replace('{thin}', sortedRatios.small)
		.replace('{wide}', sortedRatios.large)
	// Un-comment to debug
	// console.log(queryString);
	return window.matchMedia(queryString).matches
}

function get_sorted_string_ratios(ratio_one, ratio_two) {
	var stringRatios = [
		convert_to('string', ratio_one),
		convert_to('string', ratio_two),
	]
	return sort_ratios.apply(this, stringRatios)
}

function sort_ratios(ratio_one, ratio_two) {
	var numberOne = convert_to('number', ratio_one)
	var numberTwo = convert_to('number', ratio_two)

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

function convert_to(style, ratio) {
	var isNumber = is_number(ratio)
	var styles = {
		number: function () {
			return isNumber ? ratio : calculate(ratio)
		},
		string: function () {
			return !isNumber ? ratio : number_to_ratio(ratio)
		},
	}
	return styles[style]()
}

function calculate(ratio) {
	if (is_ratio(ratio)) {
		var regResult = ratio_regex.exec(ratio)
		return regResult[1] / regResult[2]
	}
	return ratio
}

function is_ratio(ratio) {
	// format = " 2 / 1 "; width / height (spaces optional)
	return typeof ratio === 'string' && ratio_regex.test(ratio)
}

function is_number(ratio) {
	return typeof ratio === 'number'
}

function check_ratio_validity(ratio) {
	if (!is_ratio(ratio) && !is_number(ratio)) {
		throw new Error(
			'"' +
				ratio +
				'" must be either a number or a string in the format "[width] / [height]"'
		)
	}
}
