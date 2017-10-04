"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./_common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MQ = function () {
	function MQ(breakpoints) {
		_classCallCheck(this, MQ);

		this.bp = breakpoints;
	}

	_createClass(MQ, [{
		key: 'checkBP',
		value: function checkBP(size) {
			return (0, _common.checkBP)(size, this.bp);
		}
	}, {
		key: 'min',
		value: function min(size, callback) {
			return (0, _common.result)((0, _common.screenWidth)() > this.checkBP(size), callback);
		}
		//alias for "min"

	}, {
		key: 'minWidth',
		value: function minWidth(size, callback) {
			return this.min(size, callback);
		}
	}, {
		key: 'max',
		value: function max(size, callback) {
			return (0, _common.result)((0, _common.screenWidth)() <= this.checkBP(size), callback);
		}
		//alias for "max"

	}, {
		key: 'maxWidth',
		value: function maxWidth(size, callback) {
			return this.max(size, callback);
		}
	}, {
		key: 'inside',
		value: function inside(large, small, callback) {
			return (0, _common.result)((0, _common.inside)(large, small, 'width', this.bp), callback);
		}
		//inside alias

	}, {
		key: 'insideWidth',
		value: function insideWidth(large, small, callback) {
			return this.inside(large, small, callback);
		}
	}, {
		key: 'outside',
		value: function outside(large, small, callback) {
			return (0, _common.result)(!(0, _common.inside)(large, small, 'width', this.bp), callback);
		}
		//outside alias

	}, {
		key: 'outsideWidth',
		value: function outsideWidth(large, small, callback) {
			return this.outside(large, small, callback);
		}
	}]);

	return MQ;
}();

exports.default = MQ;