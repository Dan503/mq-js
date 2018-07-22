
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let insideRatioResults = new ResultTracker();

	class positiveTest_thin extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: insideRatioResults,
			})
		}
	}

	class positiveTest_wide extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: insideRatioResults,
			})
		}
	}

	class negativeTest_thin extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large - 1, bp.large],
				mqMatch: false,
				test: test,
				localTracker: insideRatioResults,
			})
		}
	}

	class negativeTest_wide extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [(bp.large + 1) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: insideRatioResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_thin({
			name: `positive insideRatio string thin (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_thin({
			name: `positive insideRatio number thin (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new positiveTest_thin({
			name: `positive insideRatio mixed thin (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_thin({
			name: `positive insideRatio string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_thin({
			name: `positive insideRatio number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_thin({
			name: `positive insideRatio mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_wide({
			name: `positive insideRatio string wide (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_wide({
			name: `positive insideRatio number wide (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new positiveTest_wide({
			name: `positive insideRatio mixed wide (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_wide({
			name: `positive insideRatio string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_wide({
			name: `positive insideRatio number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_wide({
			name: `positive insideRatio mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_thin({
			name: `negative insideRatio string thin (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_thin({
			name: `negative insideRatio number thin (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new negativeTest_thin({
			name: `negative insideRatio mixed thin (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_thin({
			name: `negative insideRatio string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_thin({
			name: `negative insideRatio number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_thin({
			name: `negative insideRatio mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_wide({
			name: `negative insideRatio string wide (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_wide({
			name: `negative insideRatio number wide (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new negativeTest_wide({
			name: `negative insideRatio mixed wide (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_wide({
			name: `negative insideRatio string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_wide({
			name: `negative insideRatio number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_wide({
			name: `negative insideRatio mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('insideRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('insideRatio', insideRatioResults)
	])

}
