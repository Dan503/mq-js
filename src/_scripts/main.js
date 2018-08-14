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

_$('.btn.-max').onclick = function(e){
  e.preventDefault();

  mq.max('medium', (screen_size)=>{
    toggleActive(this);
    console.log(screen_size);
  })
};

toggler('.btn.-maxIf', ()=> mq.max('medium'));
toggler('.btn.-min', ()=> mq.min('medium'));
toggler('.btn.-inside', ()=> mq.inside('medium', 'small'));
toggler('.btn.-outside', ()=> mq.outside('medium', 'small'));

const MQ_btn = state => ({
  active: () => mq.max('medium'),
  inactive: () => mq.min('medium'),
}[state]());

_$('.btn.-mqVar').onclick = function(e){
  e.preventDefault();

  if (MQ_btn('active')){
    toggleActive(this);
  }

  if (MQ_btn('inactive')){
    toggleInactive(this);
  }

};

toggler('.btn.-pxVal', ()=> mq.max(1000));
toggler('.btn.-pxValMin', ()=> mq.min(1000));
toggler('.btn.-bpVar', ()=> mq.min(bp.medium + 30));

_$('.btn.-onResize').onclick = (e) => e.preventDefault();

function toggleBtn(){
  _$('.btn.-onResize').classList.toggle('-active', ()=> mq.inside('medium', 'small'));
};

toggleBtn();
window.onresize = debounce(toggleBtn, 200);

toggler('.btn.-maxHeight', ()=> mq.maxHeight(600));
toggler('.btn.-minHeight', ()=> mq.minHeight(600));
toggler('.btn.-insideHeight', ()=> mq.insideHeight(800, 400));
toggler('.btn.-outsideHeight', ()=> mq.outsideHeight(800, 400));
toggler('.btn.-landscape', ()=> mq.orientation('landscape'));
toggler('.btn.-portrait', ()=> mq.orientation('portrait'));
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
