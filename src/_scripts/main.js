// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import debounce from 'debounce';
import mq from './mq';

import tabs from 'tabs/tabs';

import codeLineNumbers from '~on-page-load-js/codeLineNumbers';

$(() => {
  tabs();
  codeLineNumbers();

  window.onresize = debounce(resize, 200);

  function resize(e) {
    console.log('height', window.innerHeight);
    console.log('width', window.innerWidth);
  }

  $('.btn.-one').click(function(e){
    e.preventDefault();
    mq.min('medium', (screen_width)=>{
      $(this).toggleClass('-active');
      console.log(screen_width);
    })
  })

  $('.btn.-two').click(function(e){
    e.preventDefault();
    if (mq.min('medium')){
      $(this).toggleClass('-active');
    }
  })

  $('.btn.-three').click(function(e){
    e.preventDefault();
    mq.max('medium', (screen_width)=>{
      $(this).toggleClass('-active');
      console.log(screen_width);
    })
  })
});
