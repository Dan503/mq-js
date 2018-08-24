
const m = '.m-revealer';

class Revealer {
	constructor(wrapperElem){
		this._$wrapper = wrapperElem;
		this._$trigger = this._$wrapper.querySelector(`${m}__trigger`);
		this._$slider = this._$wrapper.querySelector(`${m}__slider`);
		this._$content = this._$wrapper.querySelector(`${m}__content`);
		this.initialise();
	}

	initialise(){
		this.close();
		this.set_max_height();
		this._$wrapper.classList.add('-set');
		this._$trigger.onclick = ()=> this.toggle();
	}

	open(){
		this._$wrapper.classList.remove('-closed');
		this.isOpen = true;
	}

	close() {
		this._$wrapper.classList.add('-closed');
		this.isOpen = false;
	}

	toggle(){
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	set_max_height(){
		const height = getComputedStyle(this._$content).height;
		this._$slider.style.maxHeight = height;
	}
}

export default function(){
	const _$$revealers = [...document.querySelectorAll(m)];
	_$$revealers.forEach(_$revealer => new Revealer(_$revealer));
}
