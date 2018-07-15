
import { mq, bp, Test } from '../../src/_scripts/run_tests';

export default function(){

	// max large matches mq-scss (if)
	// max large !match max large + 1px (if)

	// max large matches mq-scss (cb)
	// max large !match max large + 1px (cb)

	return Promise.all([
		new Test({
			name: `max "large" matches mq-scss (if)`,
			size: [bp.large],
			run: ()=> mq.max('large'),
			mqMatch: true,
		})
	])

}
