
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

let resultSummary = {
	pass: 0,
	fail: 0,
};

const report_results = type => {
	return () => Promise.resolve().then(()=>{
		console.log(mq_style, type, trackTests);
	})
}

const sequence = promiseArray => {
	return promiseArray.reduce((a,b) => {
		const c = typeof a === 'function' ? a() : a;
		return c.then(b);
	});
}

class Test {
	constructor({
		size = false, // [width [, height] ]
		name = 'test name undefined',
		run = ()=>{},
		mqMatch = true,
		suite
	}) {
		Object.assign(this, {size, name, run, mqMatch});
		this.suite = suite;
		return ()=> this.run_code();
	}

	async run_code(){
		this.resize(this.size);
		const result = await this.run_test();
		this.report_results(result);
	}

	async run_test(){
		// console.log('delay start', this.name);
		return this.delay()
		.then(()=> {
			// console.log('delay end', this.name);
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
		const successful = result && this.mqMatch && this.mq_active || !result && !this.mqMatch && !this.mq_active;
		console.log(`${successful}: ${mq_style} ${this.name}`)
		this.add_test_result(successful);
	}

	add_test_result(is_a_pass){
		if (is_a_pass) {
			resultSummary.pass++;
			this.suite.testResults.pass++;
		} else {
			resultSummary.fail++;
			this.suite.testResults.fail++;
		}
	}
}

class TestSuite {
	constructor({ name, positive_tests, negative_tests }){

		Object.assign(this, {
			name,
			positive_tests,
			negative_tests,
			testResults: {
				pass: 0,
				fail: 0,
			}
		})

		return ()=> this.run_code();
	}

	run_code(){
		return sequence([
			...this.positive_tests,
			...this.negative_tests,
		])
	}
}

window.onload = function(){
	sequence([
		max(),
		report_results('max results:'),
	])
}

export { bp, mq, windowResize, has_active_styling, Test, TestSuite }
