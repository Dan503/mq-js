
import Test from './_helpers/Test';
import bp from './_helpers/breakpoints';
import mq from './_helpers/mq';
import report_result_summary from './_helpers/report_result_summary';
import sequence from './_helpers/sequence';
import ResultTracker from './_helpers/ResultTracker';

import resize from './_helpers/windowResize';

export default function(){

	let reactValue = false;
	let hasReacted = false;
	let allowReactions = false;

	mq.reactTo(()=> mq.max(bp.large), (isActive)=> {
		if (allowReactions) {
			console.log({isActive});
			hasReacted = true;
			reactValue = isActive
		}
	})

	const initialState = ()=> new Promise((resolve)=> {
		resize(bp.large + 1);
		allowReactions = true;
		console.log('initialised');
		resolve();
	});

	const delay = (timer = 100) => new Promise(resolve => setTimeout(resolve, timer));

	let reactResults = new ResultTracker();

	class positiveTest extends Test {
		constructor(){
			super({
				name:`positive reactTo`,
				test: ()=> reactValue,
				size: [bp.large],
				mqMatch: 'ignore',
				localTracker: reactResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor(){
			super({
				name:`negative reactTo`,
				test: ()=> !reactValue && hasReacted,
				size: [bp.large+1],
				mqMatch: 'ignore',
				localTracker: reactResults,
			})
		}
	}

	return sequence([
		initialState,
		delay,
		new positiveTest(),
		new negativeTest(),
		report_result_summary('reactTo', reactResults),
		()=> Promise.resolve(()=> allowReactions = false),
	])

}
