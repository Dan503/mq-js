
import { mq, bp } from '../../src/_scripts/run_tests';

export default function(){
	let result = {
		true: {
			if: false,
			cb: false,
			number: false,
			string: false,
		},
		false: {
			if: false,
			cb: false,
			number: false,
			string: false,
		}
	}

	if (mq.max(bp.large)) {
		result.if = true;
	}

	console.log(result);
}
