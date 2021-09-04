'use strict'

var c = require('./_common')
var result = c.result
var checkBP = c.checkBP
var inside_outside = c.inside_outside

function MQ(breakpoints, userSettings) {
	userSettings = userSettings || {}
	this.bp = breakpoints
	this.settings = {
		ems: false,
		emBase: 16,
	}

	overide(this.settings, userSettings)

	this.checkMQ = function (opts) {
		return checkMQ(this, opts)
	}

	this.min = function (size, callback) {
		return min(this, size, callback)
	}
	//alias for "min"
	this.minWidth = this.min

	this.max = function (size, callback) {
		return max(this, size, callback)
	}
	//alias for "max"
	this.maxWidth = this.max

	this.inside = function (sizeOne, sizeTwo, callback) {
		return inside(this, sizeOne, sizeTwo, callback)
	}
	//alias for "inside"
	this.insideWidth = this.inside

	this.outside = function (sizeOne, sizeTwo, callback) {
		return outside(this, sizeOne, sizeTwo, callback)
	}
	//alias for "outside"
	this.outsideWidth = this.outside

	this.checkBP = function (size) {
		return checkBP(size, this.bp)
	}
}

function min(instance, size, callback) {
	return result(
		instance.checkMQ({
			queryTemplate: '(min-width: {large+1})',
			largeSize: size,
		}),
		callback
	)
}

function max(instance, size, callback) {
	return result(
		instance.checkMQ({
			queryTemplate: '(max-width: {large})',
			largeSize: size,
		}),
		callback
	)
}

function inside(instance, sizeOne, sizeTwo, callback) {
	return inside_outside(
		'(max-width: {large}) and (min-width: {small+1})',
		'width',
		instance,
		sizeOne,
		sizeTwo,
		callback
	)
}

function outside(instance, sizeOne, sizeTwo, callback) {
	return inside_outside(
		'(max-width: {small}), (min-width: {large+1})',
		'width',
		instance,
		sizeOne,
		sizeTwo,
		callback
	)
}

function checkMQ(instance, opts) {
	var queryTemplate = opts.queryTemplate
	var largeSize = opts.largeSize
	var smallSize = opts.smallSize || 0

	var newSizes = {
		large: instance.checkBP(largeSize),
		small: instance.checkBP(smallSize),
	}

	// RegEx captures up to 2 groups, the second group being optional.
	// (max-width: {large}) [ and (min-width: {small+1}) ] < optional
	var regEx = /^(.*?)({.*?})(.*?)(({.*?})(.*))?$/
	var regExResult = purify_regex(regEx.exec(queryTemplate))

	// We only want the group matches in the array
	function purify_regex(result) {
		var purifiedArray = result.slice(0)
		purifiedArray.shift()
		return purifiedArray
	}

	var bracketsReplaced = regExResult.map(replace_bracket)

	function replace_bracket(string) {
		if (string) {
			var isBracketValue = /^{.*}$/.test(string)
			var isBracketPlusExtra = /^.*{.*}.*$/.test(string)
			var isIncremented = string.indexOf('+1') > 0
			var isLarge = string.indexOf('large') > 0

			if (isBracketValue) {
				var replacement = isLarge ? newSizes.large : newSizes.small
				return isIncremented ? replacement + 1 : replacement
			}

			if (!isBracketPlusExtra) {
				return string
			}
		}

		return ''
	}

	var finalValues = bracketsReplaced.map(function (value) {
		var isNumber = typeof value === 'number'
		return isNumber ? finalValue(instance, value) : value
	})

	var finalQuery = finalValues.join('')

	// Un-comment this as one of the first debug steps for inside/outside
	// console.log({finalQuery});

	return window.matchMedia(finalQuery).matches
}

function finalValue(instance, px) {
	return instance.settings.ems ? convertToEMs(instance, px) : px + 'px'
}

function convertToEMs(instance, px) {
	return px / instance.settings.emBase + 'em'
}

function overide(defaults, overides) {
	for (var property in overides) {
		defaults[property] = overides[property]
	}
}

module.exports = MQ
