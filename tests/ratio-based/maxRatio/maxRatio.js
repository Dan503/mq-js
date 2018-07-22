
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let maxRatioResults = new ResultTracker();

	class positiveTest_exact extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [ bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: maxRatioResults,
			})
		}
	}

	class positiveTest_thin extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [ (bp.large - 2) / 2, bp.large],
				mqMatch: true,
				localTracker: maxRatioResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [(bp.large + 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: maxRatioResults,
			})
		}
	}


	const positive_tests = [
		new positiveTest_exact({
			name: `positive maxRatio exact string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new positiveTest_exact({
			name: `positive maxRatio exact number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),
		new positiveTest_exact({
			name: `positive maxRatio exact string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_exact({
			name: `positive maxRatio exact number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_thin({
			name: `positive maxRatio thin string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new positiveTest_thin({
			name: `positive maxRatio thin number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),
		new positiveTest_thin({
			name: `positive maxRatio thin string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_thin({
			name: `positive maxRatio thin number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `negative maxRatio string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new negativeTest({
			name: `negative maxRatio number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),

		new negativeTest({
			name: `negative maxRatio string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest({
			name: `negative maxRatio number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

	]

	return sequence([
		apply_style('maxRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('maxRatio', maxRatioResults)
	])

}
