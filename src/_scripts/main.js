// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import debounce from 'debounce';
import { mq, bp } from './mq';
import testBreakpoints from '../../tests/_helpers/breakpoints';

import codeLineNumbers from '~on-page-load-js/codeLineNumbers';
import smoothAnchors from '~on-page-load-js/smoothAnchors';

window.test = ()=>{
  const settings = {
    innerWidth: 1000,
    innerHeight: testBreakpoints.large,
  };

  window.open('/test-em.html', 'ems test', settings);
  window.open('/test-px.html', 'px test', settings)
}

const _$ = selector => document.querySelector(selector);
// const _$$ = selector => [...document.querySelectorAll(selector)];

function toggler(selector, test){
  const _$elem = _$(selector);
  if (_$elem) {
    _$elem.onclick = function(e){
       e.preventDefault();
       if (test()) {
         this.classList.toggle('-active');
       }
     };
  }
}

codeLineNumbers();
smoothAnchors();

_$('#testingBtn').click(window.test);

const toggleActive = elem => elem.classList.toggle('-active');
const toggleInactive = elem => elem.classList.toggle('-inactive');

console.log(_$('.btn.-one'));
_$('.btn.-one').onclick = function(e){
  e.preventDefault();

  mq.max('medium', (screen_size)=>{
    toggleActive(this);
    console.log(screen_size);
  })
};

toggler('.btn.-two', ()=> mq.max('medium'));
toggler('.btn.-three', ()=> mq.min('medium'));
toggler('.btn.-four', ()=> mq.inside('medium', 'small'));
toggler('.btn.-five', ()=> mq.outside('medium', 'small'));

const MQ_btn = state => ({
  active: () => mq.max('medium'),
  inactive: () => mq.min('medium'),
}[state]());

_$('.btn.-six').onclick = function(e){
  e.preventDefault();

  if (MQ_btn('active')){
    toggleActive(this);
  }

  if (MQ_btn('inactive')){
    toggleInactive(this);
  }

};

toggler('.btn.-seven', ()=> mq.max(1000));
toggler('.btn.-eight', ()=> mq.min(1000));
toggler('.btn.-nine', ()=> mq.min(bp.medium + 30));

_$('.btn.-ten').onclick = (e) => e.preventDefault();

function toggleBtn(){
  _$('.btn.-ten').classList.toggle('-active', ()=> mq.inside('medium', 'small'));
};

toggleBtn();
window.onresize = debounce(toggleBtn, 200);

toggler('.btn.-eleven', ()=> mq.maxHeight(600));
toggler('.btn.-twelve', ()=> mq.minHeight(600));
toggler('.btn.-thirteen', ()=> mq.insideHeight(800, 400));
toggler('.btn.-fourteen', ()=> mq.outsideHeight(800, 400));
toggler('.btn.-fifteen', ()=> mq.orientation('landscape'));
toggler('.btn.-sixteen', ()=> mq.orientation('portrait'));
toggler('.btn.-exactRatio', ()=> mq.ratio(1 / 2));
toggler('.btn.-minRatio', ()=> mq.ratio('1 / 2'));
toggler('.btn.-maxRatio', ()=> mq.ratio(1 / 2));
toggler('.btn.-insideRatio', ()=> mq.insideRatio(1 / 2, 3 / 2));
toggler('.btn.-insideRatio', ()=> mq.outsideRatio(1 / 2, 3 / 2));
toggler('.btn.-maxRatioString', ()=> mq.maxRatio('1 / 2'));

mq.reactTo(()=> mq.inside(800, 900), (is_active, screen_size)=> {
  _$('.btn.-reactTo').classList.toggle('-active');
  console.log(is_active, screen_size)
});

_$('.btn.-reactTo').onclick = e => e.preventDefault();
