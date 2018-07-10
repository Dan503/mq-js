var MQ = require('../index').default;
var { result } = require('../_common');

MQ.prototype.orientation = function (orientation, callback) {

	const orientations = ['portrait', 'landscape'];

	if (orientations.indexOf(orientation) < 0) throw new Error(`"${orientation}" not supported, valid orientations: "${orientations.join('", "')}"`);

	return result(
		window.matchMedia(`(orientation: ${orientation})`).matches,
		callback
	);
}
