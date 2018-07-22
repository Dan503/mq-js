
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';

////////////
// TESTS //
//////////

// Width based
import max from '../../tests/width-based/max/max';
import min from '../../tests/width-based/min/min';
import inside from '../../tests/width-based/inside/inside';
import outside from '../../tests/width-based/outside/outside';

// Ratio based
import ratio from '../../tests/ratio-based/ratio/ratio';
import minRatio from '../../tests/ratio-based/minRatio/minRatio';
import maxRatio from '../../tests/ratio-based/maxRatio/maxRatio';
import insideRatio from '../../tests/ratio-based/insideRatio/insideRatio';

window.onload = function(){
	sequence([
		max,
		min,
		inside,
		outside,
		ratio,
		minRatio,
		maxRatio,
		insideRatio,
		report_result_summary(),
	])
}
