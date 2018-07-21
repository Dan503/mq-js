
import mq_style from './mq_style';

import { totalsTracker } from './ResultTracker';

export default function report_result_summary (type = 'total', testTracker = totalsTracker){
	return () => Promise.resolve().then(()=>{
		console.log('\n', type, mq_style, 'results:', testTracker.results, ' \n ');
	})
}
