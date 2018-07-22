
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let ratioResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [ bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: ratioResults,
			})
		}
	}

	class negativeTest_wide extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [(bp.large + 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: ratioResults,
			})
		}
	}

	class negativeTest_tall extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large / 2, bp.large + 1],
				mqMatch: false,
				test: test,
				localTracker: ratioResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `positive ratio string (if))`,
			test: ()=> mq.ratio(' 1 / 2 '),
		}),
		new positiveTest({
			name: `positive ratio number (if)`,
			test: ()=> mq.ratio(0.5),
		}),
		new positiveTest({
			name: `positive ratio string (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest({
			name: `positive ratio string (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest({
			name: `positive ratio number (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_wide({
			name: `negative ratio string (wide) (if)`,
			test: ()=> mq.ratio(' 1 / 2 '),
		}),
		new negativeTest_tall({
			name: `negative ratio string (tall) (if)`,
			test: ()=> mq.ratio('1/2'),
		}),
		new negativeTest_wide({
			name: `negative ratio number (wide) (if)`,
			test: ()=> mq.ratio(0.5),
		}),
		new negativeTest_tall({
			name: `negative ratio number (tall) (if)`,
			test: ()=> mq.ratio(0.5),
		}),


		new negativeTest_wide({
			name: `negative ratio string (wide) (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio(' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest_tall({
			name: `negative ratio string (tall) (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest_wide({
			name: `negative ratio number (wide) (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest_tall({
			name: `negative ratio number (tall) (cb)`,
			test: ()=> {
				let result = false;
				mq.ratio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

	]

	return sequence([
		apply_style('ratio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('ratio', ratioResults)
	])

}
