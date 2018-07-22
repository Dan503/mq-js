
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';

//tests
import max from '../../tests/width-based/max/max';
import min from '../../tests/width-based/min/min';
import inside from '../../tests/width-based/inside/inside';
import outside from '../../tests/width-based/outside/outside';
import ratio from '../../tests/ratio-based/ratio/ratio';

window.onload = function(){
	sequence([
		max(),
		min(),
		inside(),
		outside(),
		ratio(),
		report_result_summary(),
	])
}
