
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let outsideRatioResults = new ResultTracker();

	class positiveTest_max extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: outsideRatioResults,
			})
		}
	}

	class positiveTest_min extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: outsideRatioResults,
			})
		}
	}

	class negativeTest_max extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large - 1, bp.large],
				mqMatch: false,
				test: test,
				localTracker: outsideRatioResults,
			})
		}
	}

	class negativeTest_min extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [(bp.large + 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: outsideRatioResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_max({
			name: `positive outsideRatio string thin (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `positive outsideRatio number thin (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new positiveTest_max({
			name: `positive outsideRatio mixed thin (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `positive outsideRatio string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `positive outsideRatio number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `positive outsideRatio mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `positive outsideRatio string wide (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `positive outsideRatio number wide (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new positiveTest_min({
			name: `positive outsideRatio mixed wide (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `positive outsideRatio string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `positive outsideRatio number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `positive outsideRatio mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_max({
			name: `negative outsideRatio string thin (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `negative outsideRatio number thin (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new negativeTest_max({
			name: `negative outsideRatio mixed thin (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `negative outsideRatio string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `negative outsideRatio number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `negative outsideRatio mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `negative outsideRatio string wide (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `negative outsideRatio number wide (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new negativeTest_min({
			name: `negative outsideRatio mixed wide (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `negative outsideRatio string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `negative outsideRatio number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `negative outsideRatio mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('outsideRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('outsideRatio', outsideRatioResults)
	])

}
