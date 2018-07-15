// Do not run test in Chrome, Chrome resize is unstable
// Firefox resize is stable and predictable :D
export default function windowResize (width, height = width) {

	const difference = {
		width: window.outerWidth - window.innerWidth,
		height: window.outerHeight - window.innerHeight,
	}

	//Firefox
	// window.resizeTo(width + 16, height + 76);

	window.resizeTo(width + difference.width, height + difference.height);
}
