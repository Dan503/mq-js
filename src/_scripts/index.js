"use strict";

//designed to be used in an if statement like:
// works with the bp breakpoint object /_scripts/config/bp-break-points.js
//if (mq.min(bp('tablet') + 50){ ...functionality... }
//if (mq.inside('tablet', 'mobile'){ ...functionality... }
//can also be used like mq.min('tablet', (screenWidth)=>{ /* functionality */ });

function screenWidth(){
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function screenHeight(){
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

class MQ {
  constructor(settings = {}){

    this.settings = Object.assign({
      breakpoints : {},
      largestFirst: true,
    }, settings);

    this.bp = this.settings.breakpoints;
  }

  //Checks if the size is a valid breakpoint value
  checkBP(size){
    if (typeof size === 'string'){
      if (typeof this.bp[size] !== 'undefined'){
        return this.bp[size];
      } else {
        console.log('Available Breakpoints:', this.bp);
        throw `"${size}" breakpoint does not exist`;
      }
    } else if (typeof size === 'number') {
      return size;
    } else {
      console.log('Available Breakpoints:', this.bp);
      throw `"${size}" is not a valid breakpoint.\n It must be a string or a number`;
    }
  }

  min(size, callback = ()=>{}) {
    let screen_width = screenWidth();
    size = this.checkBP(size);

    const isAllowed = screen_width > size;

    if (isAllowed) callback.call(window, screen_width);

    return isAllowed;
  }

  max(size, callback = ()=>{}){
    let screen_width = screenWidth();
    size = this.checkBP(size);

    const isAllowed = screen_width <= size;

    if (isAllowed) callback.call(window, screen_width);

    return isAllowed;
  }

  inside(wideSize, thinSize, callback = ()=>{}){
    let screen_width = screenWidth();

    //If largestFirst is turned off,
    //it swaps the values around
    if (!this.settings.largestFirst){
      const tmp = wideSize;
      wideSize = thinSize;
      thinSize = tmp;
    }

    wideSize = this.checkBP(wideSize);
    thinSize = this.checkBP(thinSize);

    const isAllowed = thinSize < screen_width && screen_width <= wideSize;

    if (isAllowed) callback.call(window, screen_width);

    return isAllowed;
  }

  outside(wideSize, thinSize, callback = ()=>{}){
    let screen_width = screenWidth();

    const isAllowed = !this.inside(wideSize, thinSize);

    if (isAllowed) callback.call(window, screen_width);

    return isAllowed;
  }
}

export default MQ;
