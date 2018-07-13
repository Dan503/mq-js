// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import debounce from 'debounce';
import { mq, breakpoints } from './mq';
import { bp } from './run_tests';

import codeLineNumbers from '~on-page-load-js/codeLineNumbers';
import smoothAnchors from '~on-page-load-js/smoothAnchors';

window.test = ()=>{
  const settings = {
    innerWidth: 1000,
    innerHeight: bp.large,
  };

  window.open('/test-em.html', 'ems test', settings);
  window.open('/test-px.html', 'px test', settings)
}

$(() => {
  codeLineNumbers();
  smoothAnchors();

  $('#testingBtn').click(window.test)

  $('.btn.-one').click(function(e){
    e.preventDefault();

    mq.max('medium', (screen_size)=>{
      $(this).toggleClass('-active');
      console.log(screen_size);
    })
  });

  $('.btn.-two').click(function(e){
    e.preventDefault();

    if (mq.max('medium')){
      $(this).toggleClass('-active');
    }
  });

  $('.btn.-three').click(function(e){
    e.preventDefault();

    mq.min('medium', (screen_size)=>{
      $(this).toggleClass('-active');
      console.log(screen_size);
    })
  });


  $('.btn.-four').click(function(e){
    e.preventDefault();

    mq.inside('medium', 'small', (screen_size)=>{
      $(this).toggleClass('-active');

      //log the screen width at the time the button was clicked
      console.log(screen_size);
    })
  });

  $('.btn.-five').click(function(e){
    e.preventDefault();

    mq.outside('medium', 'small', (screen_size)=>{
      $(this).toggleClass('-active');

      //log the screen width at the time the button was clicked
      console.log(screen_size);
    })
  });

  const MQ_btn = state => ({
    active: () => mq.max('medium'),
    inactive: () => mq.min('medium'),
  }[state]());
  $('.btn.-six').click(function(e){
    e.preventDefault();

    if (MQ_btn('active')){
      $(this).toggleClass('-active');
    }

    if (MQ_btn('inactive')){
      $(this).toggleClass('-inactive');
    }

  });


  $('.btn.-seven').click(function(e){
    e.preventDefault();

    mq.max(1000, (screen_size)=>{
      $(this).toggleClass('-active');

      //log the screen width at the time the button was clicked
      console.log(screen_size);
    })
  })

  $('.btn.-eight').click(function(e){
    e.preventDefault();

    mq.min(1000, (screen_size)=>{
      $(this).toggleClass('-active');

      //log the screen width at the time the button was clicked
      console.log(screen_size);
    })
  })

  $('.btn.-nine').click(function(e){
    e.preventDefault();

    mq.min(breakpoints.medium + 30, (screen_size)=>{
      $(this).toggleClass('-active');

      //log the screen width at the time the button was clicked
      console.log(screen_size);
    })
  })

  $('.btn.-ten').click(function(e){
    e.preventDefault();
  });

  function toggleBtn(){
    if (mq.inside('medium', 'small')){
      $('.btn.-ten').addClass('-active');
    } else {
      $('.btn.-ten').removeClass('-active');
    }
  };

  toggleBtn();
  window.onresize = debounce(toggleBtn, 200);

  $('.btn.-eleven').click(function(e){
    e.preventDefault();
    mq.maxHeight(600, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-twelve').click(function(e){
    e.preventDefault();
    mq.minHeight(600, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-thirteen').click(function(e){
    e.preventDefault();
    mq.insideHeight(800, 400, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-fourteen').click(function(e){
    e.preventDefault();
    mq.outsideHeight(800, 400, ()=> $(this).toggleClass('-active'));
  });

  $('.btn.-fifteen').click(function(e){
    e.preventDefault();
    mq.orientation('landscape', ()=> $(this).toggleClass('-active'));
  });
  
  $('.btn.-sixteen').click(function(e){
    e.preventDefault();
    mq.orientation('portrait', ()=> $(this).toggleClass('-active'));
  });

  $('.btn.-exactRatio').click(function(e){
    e.preventDefault();
    mq.ratio(1 / 2, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-minRatio').click(function(e){
    e.preventDefault();
    mq.minRatio(1 / 2, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-maxRatio').click(function(e){
    e.preventDefault();
    mq.maxRatio(1 / 2, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-insideRatio').click(function(e){
    e.preventDefault();
    mq.insideRatio(1 / 2, 3 / 2, ()=> $(this).toggleClass('-active'));
  });
  $('.btn.-outsideRatio').click(function(e){
    e.preventDefault();
    mq.outsideRatio(1 / 2, 3 / 2, ()=> $(this).toggleClass('-active'));
  });

  $('.btn.-maxRatioString').click(function(e){
    e.preventDefault();
    mq.maxRatio('1 / 2', ()=> $(this).toggleClass('-active'));
  });

  mq.reactTo(()=> mq.inside(800, 900), (is_active, screen_size)=> {
    $('.btn.-reactTo').toggleClass('-active');
    console.log(is_active, screen_size)
  });
  $('.btn.-reactTo').click(e => e.preventDefault());

});
