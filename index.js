"use strict";

var { result, checkBP, doubleValue } = require('./_common');

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

			for (let property in userSettings){
				This.settings[property] = userSettings[property];
			}
		}
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

	checkBP(size){
		return checkBP(size, this.bp);
	}

	finalValue(px) {
		return this.settings.ems ? this.convertToEMs(px) : `${px}px`;
	}

	convertToEMs(px) {
		return `${px / this.settings.emBase}em`;
	}

	checkMQ({ queryTemplate, largeSize, smallSize = 0 }) {

		const newSizes = {
			large: this.checkBP(largeSize),
			small: this.checkBP(smallSize),
		}

		// RegEx captures up to 2 groups, the second group being optional.
		// (max-width: {large}) [ and (min-width: {small+1}) ] < optional
		const regEx = /^(.*?)({.*?})(.*?)(({.*?})(.*))?$/;
		const regExResult = purify_regex(regEx.exec(queryTemplate));

		// We only want the group matches in the array
		function purify_regex(result){
			const purifiedArray = [...result];
			purifiedArray.shift();
			return purifiedArray;
		}

		const bracketsReplaced = regExResult.map(replace_bracket);

		function replace_bracket(string) {
			if (string) {
				const isBracketValue = /^{.*}$/.test(string);
				const isBracketPlusExtra = /^.*{.*}.*$/.test(string);
				const isIncremented = string.indexOf('+1') > 0;
				const isLarge = string.indexOf('large') > 0;

				if (isBracketValue) {
					const replacement = isLarge ? newSizes.large : newSizes.small;
					return isIncremented ? replacement + 1 : replacement;
				}

				if (!isBracketPlusExtra) {
					return string;
				}
			}

			return '';
		}

		const finalValues = bracketsReplaced.map((value) => {
			const isNumber = typeof value === 'number';
			return isNumber ? this.finalValue(value) : value;
		});

		const finalQuery = finalValues.join('');

		// Un-comment this as one of the first debug steps for inside/outside
		// console.log({finalQuery});

		return window.matchMedia(finalQuery).matches;
	}

}

module.exports = MQ;
