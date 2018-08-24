
const m = '.m-revealer';

class Revealer {
	constructor(wrapperElem){
		this._$wrapper = wrapperElem;
		this._$trigger = this._$wrapper.querySelector(`${m}__trigger`);
		this._$slider = this._$wrapper.querySelector(`${m}__slider`);
		this._$content = this._$wrapper.querySelector(`${m}__content`);
		this.isReady = false;
		this.timer;
		this.initialise();
	}

	initialise(){
		this.close();
		this._$wrapper.classList.add('-set');
		this._$trigger.onclick = ()=> this.toggle();
		this.isReady = true;
	}

	open(){
		this._$wrapper.classList.remove('-closed');
		this.wait_for_animation().then(()=>{
			this.isOpen = true;
			this.clear_max_height();
		});
	}

	close() {
		this.set_max_height();
		this.delay(1).then(()=>{
			this._$wrapper.classList.add('-closed');
			this.isOpen = false;
		})
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
	clear_max_height(){
		this._$slider.style.maxHeight = 'none';
	}

	delay(delay){
		return new Promise(resolve => {
			setTimeout(resolve, delay);
		})
	}

	wait_for_animation(){
		clearTimeout(this.timer);
		this.isReady = false;
		return new Promise(resolve => {
			this.timer = setTimeout(resolve, 500);
		}).then(()=> {
			return Promise.resolve(()=> this.isReady = true);
		});
	}
}

export default function(){
	const _$$revealers = [...document.querySelectorAll(m)];
	_$$revealers.forEach(_$revealer => new Revealer(_$revealer));
}
