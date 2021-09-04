var MQ = require('../index')
var result = require('../_common').result

MQ.prototype.orientation = function (orientation, callback) {
	var orientations = ['portrait', 'landscape']

	if (orientations.indexOf(orientation) < 0) {
		throw new Error(
			[
				'"',
				orientation,
				'" not supported, valid orientations: "',
				orientations.join('", "'),
				'"',
			].join('')
		)
	}

	return result(
		window.matchMedia('(orientation: ' + orientation + ')').matches,
		callback
	)
}
