var MQ = require('../index');
var { result, screenSize, inside } = require('../_common');

MQ.prototype.orientation = function (orientation, callback) {
	return result(
		checkOrientation(orientation),
		callback
	);
}

function checkOrientation (orientation) {
	const { width, height } = screenSize();

	const orientations = {
		//Square counts as portrait in css media queries
		portrait: ()=> width <= height,
		landscape: ()=> width > height
	}

	if (!orientations[orientation]) throw new Error(`"${orientation}" not supported, valid orientations: ${Object.keys(orientations)}`);

	return orientations[orientation]();
}
