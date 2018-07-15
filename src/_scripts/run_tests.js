
import $ from 'jquery';

//tests
import max from 'max/max';

import MQ from '../../index';

const bp = {
	large: 600,
	small: 300,
}

const using_ems = window.location.pathname.indexOf('em') > 1;

const mq_style = using_ems ? 'em' : 'px';

const mq = using_ems ? new MQ(bp, { ems: true }) : new MQ(bp);

const getStyle = function(element, property) {
	return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
};

const has_active_styling = ()=> getStyle(document.querySelector('html'), 'background-color') !== 'rgba(0, 0, 0, 0)';

// Do not run test in Chrome, Chrome resize is unstable
// Firefox resize is stable and predictable :D
const windowResize = (width, height = width) => {

	const difference = {
		width: window.outerWidth - window.innerWidth,
		height: window.outerHeight - window.innerHeight,
	}

	//Firefox
	// window.resizeTo(width + 16, height + 76);

	window.resizeTo(width + difference.width, height + difference.height);
}

let trackTests = {
	pass: 0,
	fail: 0,
};

const add_test_result = (is_a_pass)=> {
	if (is_a_pass) {
		trackTests.pass++;
	} else {
		trackTests.fail++;
	}
}

class Test {
	constructor({
		size = false, // [width [, height] ]
		name = 'test name undefined',
		run = ()=>{},
		mqMatch = true,
	}) {
		Object.assign(this, {size, name, run, mqMatch});
		return this.run_code();
	}

	async run_code(){
		this.resize(this.size);
		const result = await this.run_test();
		this.report_results(result);
	}

	async run_test(){
		return this.delay()
		.then(()=> {
			this.mq_active = has_active_styling();
			return this.run()
		});
	}

	delay(delay = 100) {
		return new Promise((resolve)=> setTimeout(resolve, delay));
	}

	resize(size){
		if (size) windowResize(...size);
	}

	report_results(result){
		const successful = result && this.mqMatch && this.mq_active || result && !this.mqMatch && !this.mq_active;
		console.log(`${successful}: ${mq_style} ${this.name}`)
		add_test_result(successful);
	}
}

const report_results = ()=> {
	console.log(mq_style, trackTests);
}

window.onload = async function(){
	await Promise.all([
		max(),
	])

	report_results();
}

export { bp, mq, windowResize, has_active_styling, Test }
