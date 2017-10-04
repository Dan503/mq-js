'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _common = require('../_common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.prototype.ratio = function (ratio, callback) {
	return (0, _common.result)(checkRatio(ratio, 'exact'), callback);
};

_index2.default.prototype.minRatio = function (ratio, callback) {
	return (0, _common.result)(checkRatio(ratio, 'min'), callback);
};

_index2.default.prototype.maxRatio = function (ratio, callback) {
	return (0, _common.result)(checkRatio(ratio, 'max'), callback);
};

_index2.default.prototype.insideRatio = function (large, small, callback) {
	return (0, _common.result)(insideRatio(large, small), callback);
};

_index2.default.prototype.outsideRatio = function (large, small, callback) {
	return (0, _common.result)(!insideRatio(large, small), callback);
};

function insideRatio(largeRatio, smallRatio) {
	return (0, _common.inside)(convertRatio(largeRatio), convertRatio(smallRatio), 'ratio', {});
}

function checkRatio(ratio, style) {
	var ratios = getRatios(ratio);
	return {
		exact: function exact() {
			return ratios.converted === ratios.screen;
		},
		min: function min() {
			return ratios.converted < ratios.screen;
		},
		max: function max() {
			return ratios.converted >= ratios.screen;
		}
	}[style]();
}

function exactRatioCheck(ratio) {
	var ratios = getRatios(ratio);
	return ratios.converted === ratios.screen;
}

function minRatio() {
	return ratios.converted === ratios.screen;
}

function getRatios(ratio) {
	return {
		converted: convertRatio(ratio),
		screen: (0, _common.screenSize)().ratio
	};
}

function convertRatio(ratio) {

	var isNumber = typeof ratio === 'number';
	var isFormattedString = typeof ratio === 'string' && !ratio.match(/[0-9\.]+\s*?\/\s*?[0-9\.]+/);

	if (!isNumber && !isFormattedString) {
		throw new Error('"' + ratio + '" must be either a number or a string in the format "[width] / [height]"');
	}

	if (isNumber) {
		return ratio;
	} else {
		return eval(ratio);
	}
}