'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _common = require('../_common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.prototype.orientation = function (orientation, callback) {
	return (0, _common.result)(checkOrientation(orientation), callback);
};

function checkOrientation(orientation) {
	var _screenSize = (0, _common.screenSize)(),
	    width = _screenSize.width,
	    height = _screenSize.height;

	var orientations = {
		//Square counts as portrait in css media queries
		portrait: function portrait() {
			return width <= height;
		},
		landscape: function landscape() {
			return width > height;
		}
	};

	if (!orientations[orientation]) throw new Error('"' + orientation + '" not supported, valid orientations: ' + Object.keys(orientations));

	return orientations[orientation]();
}