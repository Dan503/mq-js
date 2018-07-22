
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let minRatioResults = new ResultTracker();

	class positiveTest_exact extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [ bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: minRatioResults,
			})
		}
	}

	class positiveTest_wide extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [ (bp.large + 2) / 2, bp.large],
				mqMatch: true,
				localTracker: minRatioResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [(bp.large - 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: minRatioResults,
			})
		}
	}


	const positive_tests = [
		new positiveTest_exact({
			name: `positive minRatio exact string (if)`,
			test: ()=> mq.minRatio(' 1 / 2 '),
		}),
		new positiveTest_exact({
			name: `positive minRatio exact number (if)`,
			test: ()=> mq.minRatio(0.5),
		}),
		new positiveTest_exact({
			name: `positive minRatio exact string (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_exact({
			name: `positive minRatio exact number (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_wide({
			name: `positive minRatio wide string (if)`,
			test: ()=> mq.minRatio(' 1 / 2 '),
		}),
		new positiveTest_wide({
			name: `positive minRatio wide number (if)`,
			test: ()=> mq.minRatio(0.5),
		}),
		new positiveTest_wide({
			name: `positive minRatio wide string (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_wide({
			name: `positive minRatio wide number (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `negative minRatio string (if)`,
			test: ()=> mq.minRatio(' 1 / 2 '),
		}),
		new negativeTest({
			name: `negative minRatio number (if)`,
			test: ()=> mq.minRatio(0.5),
		}),

		new negativeTest({
			name: `negative minRatio string (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest({
			name: `negative minRatio number (cb)`,
			test: ()=> {
				let result = false;
				mq.minRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

	]

	return sequence([
		apply_style('minRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('minRatio', minRatioResults)
	])

}
