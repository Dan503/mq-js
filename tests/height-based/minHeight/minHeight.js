
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let minHeightResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large, bp.large+1],
				mqMatch: true,
				localTracker: minHeightResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large],
				mqMatch: false,
				test: test,
				localTracker: minHeightResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `minHeight "large" matches mq-scss (if)`,
			test: ()=> mq.minHeight('large'),
		}),

		new positiveTest({
			name: `minHeight ${bp.large} matches mq-scss (if)`,
			test: ()=> mq.minHeight(bp.large),
		}),

		new positiveTest({
			name: `minHeight "large" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.minHeight('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest({
			name: `minHeight ${bp.large} matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.minHeight(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `minHeight "large" no match mq-scss (if)`,
			test: ()=> mq.minHeight('large'),
		}),

		new negativeTest({
			name: `minHeight ${bp.large} no match mq-scss (if)`,
			test: ()=> mq.minHeight(bp.large),
		}),

		new negativeTest({
			name: `minHeight "large" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.minHeight('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest({
			name: `minHeight ${bp.large} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.minHeight(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('minHeight'),
		...positive_tests,
		...negative_tests,
		report_result_summary('minHeight', minHeightResults)
	])

}
