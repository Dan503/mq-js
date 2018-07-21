
import { using_ems } from './mq_style';

// Do not run test in Chrome, Chrome resize is unstable
// Firefox resize is stable and predictable :D
export default function windowResize (width, height = width) {

	const difference = {
		width: window.outerWidth - window.innerWidth,
		height: window.outerHeight - window.innerHeight,
	}

	const multiplier = get_multiplier();

	const final = {
		width: (width * multiplier) + difference.width,
		height: (height * multiplier) + difference.height,
	}

	window.resizeTo(final.width, final.height);
}

function get_multiplier(){
	if (using_ems) {
		const $document = document.querySelector('body');
		const fontSize = parseFloat( getComputedStyle($document).fontSize );
		return fontSize / 16;
	}
	return 1;
}
