
var MQ = require('../index');
var { result, doubleValue } = require('../_common');

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
	return result(
		doubleValue({
			queryTemplate: '(max-height: {large}) and (min-height: {small+1})',
			sizeOne,
			sizeTwo,
			dimension: 'height',
			MQ_instance: this,
		}),
		callback
	);
}

MQ.prototype.outsideHeight = function (sizeOne, sizeTwo, callback){
	return result(
		doubleValue({
			queryTemplate: '(max-height: {small}), (min-height: {large+1})',
			sizeOne,
			sizeTwo,
			dimension: 'height',
			MQ_instance: this,
		}),
		callback
	);
}
