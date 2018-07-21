
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';

//tests
import max from '../../tests/max/max';
import min from '../../tests/min/min';
import inside from '../../tests/inside/inside';
import outside from '../../tests/outside/outside';

window.onload = function(){
	sequence([
		max(),
		min(),
		inside(),
		outside(),
		report_result_summary(),
	])
}
