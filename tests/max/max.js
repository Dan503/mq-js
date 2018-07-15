
import { mq, bp, Test, report_result_summary, sequence } from '../../src/_scripts/run_tests';

export default function(){

	let maxResults = {
		pass: 0,
		fail: 0,
	}

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large],
				mqMatch: true,
				localResults: maxResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large+1],
				mqMatch: false,
				test: test,
				localResults: maxResults,
			})
		}
	}

	// max large matches mq-scss (if)
	// max large !match max large + 1px (if)

	// max large matches mq-scss (cb)
	// max large !match max large + 1px (cb)

	const positive_tests = [
		new positiveTest({
			name: `max "large" matches mq-scss (if)`,
			test: ()=> mq.max('large'),
		}),

		new positiveTest({
			name: `max bp.large matches mq-scss (if)`,
			test: ()=> mq.max(bp.large),
		}),

		new positiveTest({
			name: `max "large" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest({
			name: `max bp.large matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `max "large" no match mq-scss (if)`,
			test: ()=> mq.max('large'),
		}),

		new negativeTest({
			name: `max bp.large no match mq-scss (if)`,
			test: ()=> mq.max(bp.large),
		}),

		new negativeTest({
			name: `max "large" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest({
			name: `max bp.large no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		...positive_tests,
		...negative_tests,
		report_result_summary('max', maxResults)
	])

}
