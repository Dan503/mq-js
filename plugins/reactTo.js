var MQ = require('../index');
var { screenSize } = require('../_common');

const callbackList = [];

MQ.prototype.reactTo = function (query, callback) {
	if (typeof query !== 'function') {
		throw new Error('First argument should be a function that returns the result of an mq-js screen check, eg: ()=> mq.min(1000)')
	}
	if (typeof callback !== 'function') {
		throw new Error('Second argument should be a function that you wish to run when a change in screen size is detected.')
	}

	let oldStatus = query();
	callbackList.push(callback);

	window.addEventListener("resize", check_query(query, oldStatus), true);
}

function check_query(query, oldStatus){
	return function mq_js_reaction () {
		const newStatus = query();
		if (oldStatus != newStatus) {
			oldStatus = newStatus;
			callbackList.forEach(cb => cb.call(window, newStatus, screenSize()));
		}
	}
}
