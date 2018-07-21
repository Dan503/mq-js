
import Test from '../_helpers/Test';
import bp from '../_helpers/breakpoints';
import mq from '../_helpers/mq';
import report_result_summary from '../_helpers/report_result_summary';
import sequence from '../_helpers/sequence';
import ResultTracker from '../_helpers/ResultTracker';
import apply_style from '../_helpers/apply_style';

export default function(){

	let outsideResults = new ResultTracker();

	class positiveTest_low extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.small],
				mqMatch: true,
				localTracker: outsideResults,
			})
		}
	}

	class positiveTest_high extends Test {
		constructor({ name, test }){
			super({
				name,
				test,
				size: [bp.large+1],
				mqMatch: true,
				localTracker: outsideResults,
			})
		}
	}

	class negativeTest_low extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.small+1],
				mqMatch: false,
				test: test,
				localTracker: outsideResults,
			})
		}
	}

	class negativeTest_high extends Test {
		constructor({ name, test }){
			super({
				name,
				size: [bp.large],
				mqMatch: false,
				test: test,
				localTracker: outsideResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_low({
			name: `outside "small" matches mq-scss (if)`,
			test: ()=> mq.outside('small', 'large'),
		}),

		new positiveTest_low({
			name: `outside ${bp.small} matches mq-scss (if)`,
			test: ()=> mq.outside(bp.large, bp.small),
		}),

		new positiveTest_low({
			name: `outside "small" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_low({
			name: `outside ${bp.small} matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `outside "large" matches mq-scss (if)`,
			test: ()=> mq.outside('small', 'large'),
		}),

		new positiveTest_high({
			name: `outside ${bp.large} matches mq-scss (if)`,
			test: ()=> mq.outside(bp.large, bp.small),
		}),

		new positiveTest_high({
			name: `outside "large" matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `outside ${bp.large} matches mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_high({
			name: `outside "large" no match mq-scss (if)`,
			test: ()=> mq.outside('large', 'small'),
		}),

		new negativeTest_high({
			name: `outside ${bp.large} no match mq-scss (if)`,
			test: ()=> mq.outside(bp.small, bp.large),
		}),

		new negativeTest_high({
			name: `outside "large" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_high({
			name: `outside ${bp.large} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `outside "small" no match mq-scss (if)`,
			test: ()=> mq.outside('large', 'small'),
		}),

		new negativeTest_low({
			name: `outside ${bp.small} no match mq-scss (if)`,
			test: ()=> mq.outside(bp.small, bp.large),
		}),

		new negativeTest_low({
			name: `outside "small" no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `outside ${bp.small} no match mq-scss (cb)`,
			test: ()=> {
				let result = false;
				mq.outside(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return ()=> sequence([
		apply_style('outside'),
		...positive_tests,
		...negative_tests,
		report_result_summary('outside', outsideResults)
	])

}
