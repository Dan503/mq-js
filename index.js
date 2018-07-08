"use strict";

var { result, screenWidth, screenSize, checkBP, inside } = require('./_common');

class MQ {
	constructor(breakpoints){
		this.bp = breakpoints;
	}

	checkBP(size){
		return checkBP(size, this.bp);
	}

	min(size, callback) {
		return result(
			screenWidth() > this.checkBP(size),
			callback
		);
	}
	//alias for "min"
	minWidth(size, callback){
		return this.min(size, callback);
	}

	max(size, callback){
		return result(
			screenWidth() <= this.checkBP(size),
			callback
		);
	}
	//alias for "max"
	maxWidth(size, callback){
		return this.max(size, callback);
	}

	inside(large, small, callback){
		return result(
			inside(large, small, 'width', this.bp),
			callback
		);
	}
	//inside alias
	insideWidth(large, small, callback){
		return this.inside(large, small, callback);
	}

	outside(large, small, callback){
		return result(
			!inside(large, small, 'width', this.bp),
			callback
		);
	}
	//outside alias
	outsideWidth(large, small, callback){
		return this.outside(large, small, callback);
	}

}

exports.default = MQ;
