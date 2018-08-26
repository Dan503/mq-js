
var MQ = require('../index');
var c = require('../_common');
var result = c.result;
var inside_outside = c.inside_outside;

MQ.prototype.minHeight = function (size, callback){
	return result(
		this.checkMQ({ queryTemplate: '(min-height: {large+1})', largeSize: size }),
		callback
	);
}

MQ.prototype.maxHeight = function (size, callback){
	return result(
		this.checkMQ({ queryTemplate: '(max-height: {large})', largeSize: size }),
		callback
	);
}

MQ.prototype.insideHeight = function (sizeOne, sizeTwo, callback){
	return inside_outside('(max-height: {large}) and (min-height: {small+1})', 'height', this, sizeOne, sizeTwo, callback);
}

MQ.prototype.outsideHeight = function (sizeOne, sizeTwo, callback){
	return inside_outside('(max-height: {small}), (min-height: {large+1})', 'height', this, sizeOne, sizeTwo, callback);
}
