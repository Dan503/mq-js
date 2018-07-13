
import $ from 'jquery';

//tests
import max from 'max/max';

import MQ from '../../index';

const bp = {
	large: 600,
	small: 300,
}

const using_ems = window.location.pathname.indexOf('em') > 1;

const mq = using_ems ? new MQ(bp, { ems: true }) : new MQ(bp);

// Do not run test in Chrome, Chrome resize is unstable
// Firefox resize is stable and predictable :D
const windowResize = (width, height = width) => {

	const difference = {
		width: window.outerWidth - window.innerWidth,
		height: window.outerHeight - window.innerHeight,
	}

	//Firefox
	// window.resizeTo(width + 16, height + 76);

	window.resizeTo(width + difference.width, height + difference.height);
}

windowResize(bp.large);

$(()=>{
	max();
})

export { bp, mq, windowResize }
