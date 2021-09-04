var MQ = require('../index')
var screenSize = require('../_common').screenSize

var callbackList = []

MQ.prototype.reactTo = function (query, callback) {
	if (typeof query !== 'function') {
		throw new Error(
			'First argument should be a function that returns the result of an mq-js screen check, eg: ()=> mq.min(1000)'
		)
	}
	if (typeof callback !== 'function') {
		throw new Error(
			'Second argument should be a function that you wish to run when a change in screen size is detected.'
		)
	}

	var oldStatus = query()
	callbackList.push(callback)

	check_query(query, null)()

	window.addEventListener('resize', check_query(query, oldStatus), true)
}

function check_query(query, oldStatus) {
	return function mq_js_reaction() {
		var newStatus = query()
		if (oldStatus != newStatus) {
			oldStatus = newStatus
			callbackList.forEach(function (cb) {
				return cb.call(window, newStatus, screenSize())
			})
		}
	}
}
