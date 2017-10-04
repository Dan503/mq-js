'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _common = require('../_common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.prototype.minHeight = function (size, callback) {
	return (0, _common.result)((0, _common.screenHeight)() > this.checkBP(size), callback);
};

_index2.default.prototype.maxHeight = function (size, callback) {
	return (0, _common.result)((0, _common.screenHeight)() <= this.checkBP(size), callback);
};

_index2.default.prototype.insideHeight = function (large, small, callback) {
	return (0, _common.result)((0, _common.inside)(large, small, 'height', this.bp), callback);
};

_index2.default.prototype.outsideHeight = function (large, small, callback) {
	return (0, _common.result)(!(0, _common.inside)(large, small, 'height', this.bp), callback);
};