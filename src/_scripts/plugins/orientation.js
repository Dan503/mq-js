import MQ from '../index';
import { result, screenSize, inside } from './_common';

MQ.prototype.orientation = function (orientation, callback) {
	return result(
		checkOrientation(orientation),
		callback
	);
}

function checkOrientation (orientation) {
	const { width, height } = screenSize();

	const orientations = {
		portrait: ()=> width < height,
		landscape: ()=> width > height,
		square: ()=> width === height,
	}

	if (!orientations[orientation]) throw new Error(`"${orientation}" not supported, valid orientations: ${Object.keys(orientations)}`);

	return orientations[orientation]();
}
