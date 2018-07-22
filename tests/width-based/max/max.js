
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let maxResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: maxResults,
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
				localTracker: maxResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `maxWidth test`,
			test: ()=> mq.maxWidth('large'),
		}),

		new positiveTest({
			name: `max "large" matches mq-scss (if)`,
			test: ()=> mq.max('large'),
		}),

		new positiveTest({
			name: `max ${bp.large} matches mq-scss (if)`,
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
			name: `max ${bp.large} matches mq-scss (cb)`,
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
			name: `max ${bp.large} no match mq-scss (if)`,
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
			name: `max ${bp.large} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return ()=> sequence([
		apply_style('max'),
		...positive_tests,
		...negative_tests,
		report_result_summary('max', maxResults)
	])

}
