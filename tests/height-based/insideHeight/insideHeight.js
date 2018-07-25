
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let insideHeightResults = new ResultTracker();

	class positiveTest_low extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.small, bp.small+1],
				mqMatch: true,
				localTracker: insideHeightResults,
			})
		}
	}

	class positiveTest_high extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: insideHeightResults,
			})
		}
	}

	class negativeTest_low extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.small],
				mqMatch: false,
				test: test,
				localTracker: insideHeightResults,
			})
		}
	}

	class negativeTest_high extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large, bp.large+1],
				mqMatch: false,
				test: test,
				localTracker: insideHeightResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_low({
			name: `insideHeight "small" matches mq-scss (if)`,
			test: ()=> mq.insideHeight('small', 'large'),
		}),

		new positiveTest_low({
			name: `insideHeight ${bp.small} matches mq-scss (if)`,
			test: ()=> mq.insideHeight(bp.large, bp.small),
		}),

		new positiveTest_low({
			name: `insideHeight "small" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_low({
			name: `insideHeight ${bp.small} matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `insideHeight "large" matches mq-scss (if)`,
			test: ()=> mq.insideHeight('small', 'large'),
		}),

		new positiveTest_high({
			name: `insideHeight ${bp.large} matches mq-scss (if)`,
			test: ()=> mq.insideHeight(bp.large, bp.small),
		}),

		new positiveTest_high({
			name: `insideHeight "large" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `insideHeight ${bp.large} matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_high({
			name: `insideHeight "large" no match mq-scss (if)`,
			test: ()=> mq.insideHeight('large', 'small'),
		}),

		new negativeTest_high({
			name: `insideHeight ${bp.large} no match mq-scss (if)`,
			test: ()=> mq.insideHeight(bp.small, bp.large),
		}),

		new negativeTest_high({
			name: `insideHeight "large" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_high({
			name: `insideHeight ${bp.large} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `insideHeight "small" no match mq-scss (if)`,
			test: ()=> mq.insideHeight('large', 'small'),
		}),

		new negativeTest_low({
			name: `insideHeight ${bp.small} no match mq-scss (if)`,
			test: ()=> mq.insideHeight(bp.small, bp.large),
		}),

		new negativeTest_low({
			name: `insideHeight "small" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `insideHeight ${bp.small} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('insideHeight'),
		...positive_tests,
		...negative_tests,
		report_result_summary('insideHeight', insideHeightResults)
	])

}
