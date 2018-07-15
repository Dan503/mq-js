
import { mq, bp, Test, TestSuite } from '../../src/_scripts/run_tests';

export default function(){

	class max_test extends Test {
		constructor({
			size = false, // [width [, height] ]
			name = 'test name undefined',
			run = ()=>{},
			mqMatch = true,
			suite
		}){
			super({ size, name, run, mqMatch, suite })
		}
	}

	// max large matches mq-scss (if)
	// max large !match max large + 1px (if)

	// max large matches mq-scss (cb)
	// max large !match max large + 1px (cb)

	const positive_tests = [
		new Test({
			name: `max "large" matches mq-scss (if)`,
			size: [bp.large],
			mqMatch: true,
			run: ()=> mq.max('large'),
		}),

		new Test({
			name: `max bp.large matches mq-scss (if)`,
			size: [bp.large],
			mqMatch: true,
			run: ()=> mq.max(bp.large),
		}),

		new Test({
			name: `max "large" matches mq-scss (cb)`,
			size: [bp.large],
			mqMatch: true,
			run: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new Test({
			name: `max bp.large matches mq-scss (cb)`,
			size: [bp.large],
			mqMatch: true,
			run: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new Test({
			name: `max "large" no match mq-scss (if)`,
			size: [bp.large+1],
			mqMatch: false,
			run: ()=> mq.max('large'),
		}),

		new Test({
			name: `max bp.large no match mq-scss (if)`,
			size: [bp.large+1],
			mqMatch: false,
			run: ()=> mq.max(bp.large),
		}),

		new Test({
			name: `max "large" no match mq-scss (cb)`,
			size: [bp.large+1],
			mqMatch: false,
			run: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new Test({
			name: `max bp.large no match mq-scss (cb)`,
			size: [bp.large+1],
			mqMatch: false,
			run: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]


	return new TestSuite({
		name: 'max',
		positive_tests,
		negative_tests,
	})

}
