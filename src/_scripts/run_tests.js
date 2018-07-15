
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';

//tests
import max from '../../tests/max/max';


window.onload = function(){
	sequence([
		max(),
		report_result_summary(),
	])
}
