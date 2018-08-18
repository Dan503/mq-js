
class Revealer {
	constructor(wrapperElem){
		this._$wrapper = wrapperElem;
	}
}

export default function(){
	const _$$revealers = [...document.querySelectorAll('.m-revealer')];
	_$$revealers.forEach(_$revealer => new Revealer(_$revealer));
}
