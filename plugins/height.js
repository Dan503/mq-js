
var MQ = require('../index');
var { result, screenHeight, inside } = require('../_common');

MQ.prototype.minHeight = function (size, callback){
	return result(
		screenHeight() > this.checkBP(size),
		callback
	);
}

MQ.prototype.maxHeight = function (size, callback){
	return result(
		screenHeight() <= this.checkBP(size),
		callback
	);
}

MQ.prototype.insideHeight = function (large, small, callback){
	return result(
		inside(large, small, 'height', this.bp),
		callback
	);
}

MQ.prototype.outsideHeight = function (large, small, callback){
	return result(
		!inside(large, small, 'height', this.bp),
		callback
	);
}
