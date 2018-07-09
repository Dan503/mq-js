"use strict";

var { result, screenWidth, screenSize, checkBP, doubleValue } = require('./_common');

class MQ {
	constructor(breakpoints, userSettings = {}){
		const This = this;
		this.bp = breakpoints;
		assign_default_settings();

		function assign_default_settings(){
			This.settings = {
				ems: false,
				emBase: 16,
			}

			for (property in userSettings){
				this.settings[property] = userSettings[property];
			}
		}
	}

	convertToEMs(px) {
		return `${px / this.settings.emBase}em`;
	}

	finalValue(px) {
		return this.settings.ems ? this.convertToEMs(px) : `${px}px`;
	}

	checkMQ({ queryTemplate, largeSize, smallSize = 0 }) {

		const newSizes = {
			large: this.checkBP(largeSize),
			small: this.checkBP(smallSize),
		}

		// RegEx captures up to 2 groups, the second group being optional.
		// (max-width: {{large}}) [ and (min-width: {{small+1}}) ] < optional
		const regEx = /^(.*?)({.*?})(.*?)({.*?}(.*))?$/;
		let regExResult = regEx.exec(queryTemplate);

		// We don't want item 0 of the regEx result
		regExResult.shift();

		const bracketsReplaced = regExResult.map(replace_bracket);

		function replace_bracket(string) {
			const isBracketValue = /^{.*}$/.test(string);
			const isIncremented = string.indexOf('+1') > 0;
			const isLarge = string.indexOf('large');

			if (isBracketValue) {
				const replacement = isLarge ? newSizes.large : newSizes.small;
				return isIncremented ? replacement + 1 : replacement;
			}

			return string;
		}

		const finalValues = bracketsReplaced.map((value) => {
			const isNumber = typeof value === 'number';
			return isNumber ? this.finalValue(value) : value;
		});

		const finalQuery = finalValues.join('');

		return window.matchMedia(finalQuery).matches;
	}

	checkBP(size){
		return checkBP(size, this.bp);
	}

	min(size, callback) {
		return result(
			this.checkMQ({ queryTemplate: '(min-width: {large+1})', largeSize: size }),
			callback
		);
	}
	//alias for "min"
	minWidth(size, callback){
		return this.min(size, callback);
	}

	max(size, callback){
		return result(
			this.checkMQ({ queryTemplate: '(max-width: {large})', largeSize: size }),
			callback
		);
	}
	//alias for "max"
	maxWidth(size, callback){
		return this.max(size, callback);
	}

	inside(sizeOne, sizeTwo, callback){
		return result(
			doubleValue({
				queryTemplate: '(max-width: {large}) and (min-width: {small+1})',
				sizeOne,
				sizeTwo,
				dimension: 'width',
				MQ_instance: this,
			}),
			callback
		);
	}
	//inside alias
	insideWidth(large, small, callback){
		return this.inside(large, small, callback);
	}

	outside(sizeOne, sizeTwo, callback){
		return result(
			doubleValue({
				queryTemplate: '(max-width: {small}), (min-width: {large+1})',
				sizeOne,
				sizeTwo,
				dimension: 'width',
				MQ_instance: this,
			}),
			callback
		);
	}
	//outside alias
	outsideWidth(large, small, callback){
		return this.outside(large, small, callback);
	}

}

exports.default = MQ;
