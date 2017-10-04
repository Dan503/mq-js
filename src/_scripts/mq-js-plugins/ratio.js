
import MQ from '../index';
import { result, screenSize, inside } from '../_common';

MQ.prototype.ratio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'exact'),
		callback
	);
}

MQ.prototype.minRatio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'min'),
		callback
	);
}

MQ.prototype.maxRatio = function (ratio, callback){
	return result(
		checkRatio(ratio, 'max'),
		callback
	);
}

MQ.prototype.insideRatio = function (large, small, callback){
	return result(
		insideRatio(large, small),
		callback
	)
}

MQ.prototype.outsideRatio = function (large, small, callback){
	return result(
		!insideRatio(large, small),
		callback
	);
}

function insideRatio (largeRatio, smallRatio) {
	return inside (
		convertRatio(largeRatio),
		convertRatio(smallRatio),
		'ratio',
		{}
	)
}

function checkRatio (ratio, style) {
	const ratios = getRatios(ratio);
	return {
		exact: ()=> ratios.converted === ratios.screen,
		min: ()=> ratios.converted < ratios.screen,
		max: ()=> ratios.converted >= ratios.screen,
	}[style]();
}

function exactRatioCheck (ratio) {
	const ratios = getRatios(ratio);
	return ratios.converted === ratios.screen;
}

function minRatio () {
	return ratios.converted === ratios.screen;
}

function getRatios (ratio) {
	return {
		converted: convertRatio(ratio),
		screen: screenSize().ratio,
	}
}

function convertRatio (ratio) {

	const isNumber = typeof ratio === 'number';
	const isFormattedString = typeof ratio === 'string' && !ratio.match(/[0-9\.]+\s*?\/\s*?[0-9\.]+/);

	if (!isNumber && !isFormattedString) {
		throw new Error(`"${ratio}" must be either a number or a string in the format "[width] / [height]"`);
	}

	if (isNumber) {
		return ratio;
	} else {
		return eval(ratio);
	}
}
