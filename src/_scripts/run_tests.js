
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';

//tests
import max from '../../tests/max/max';
import min from '../../tests/min/min';


window.onload = function(){
	sequence([
		max(),
		min(),
		report_result_summary(),
	])
}
