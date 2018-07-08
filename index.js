"use strict";

var { result, screenWidth, screenSize, checkBP, inside } = require('./_common');

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

	checkMQ(type, size) {
		const newSize = this.checkBP(size);
		const types = {
			min: ()=> {
				const width = this.finalValue(newSize + 1);
				return window.matchMedia(`(min-width: ${width})`).matches;
			},
			max: ()=> {
				const width = this.finalValue(newSize);
				return window.matchMedia(`(max-width: ${width})`).matches;
			}
		}

		return types[type]();
	}

	checkBP(size){
		return checkBP(size, this.bp);
	}

	min(size, callback) {
		return result(
			this.checkMQ('min', size),
			callback
		);
	}
	//alias for "min"
	minWidth(size, callback){
		return this.min(size, callback);
	}

	max(size, callback){
		return result(
			this.checkMQ('min', size),
			callback
		);
	}
	//alias for "max"
	maxWidth(size, callback){
		return this.max(size, callback);
	}

	inside(large, small, callback){
		return result(
			inside(large, small, 'width', this),
			callback
		);
	}
	//inside alias
	insideWidth(large, small, callback){
		return this.inside(large, small, callback);
	}

	outside(large, small, callback){
		return result(
			!inside(large, small, 'width', this),
			callback
		);
	}
	//outside alias
	outsideWidth(large, small, callback){
		return this.outside(large, small, callback);
	}

}

exports.default = MQ;
