# mq-js

mq-js was inspired by the [mq-scss](https://www.npmjs.com/package/mq-scss) Sass mixin. I wanted to use media queries in JavaScript in a similar sort of way to how I was using media queries in my Sass code.

If you haven't looked into [mq-scss](https://www.npmjs.com/package/mq-scss) I highly recommend checking it out. It makes writing media queries far easier than any other method.

## Quick start guide

This documentation assumes that you have the ability to use ES6 JavaScript syntax in your project. Try out [Babel](https://babeljs.io/) if you aren't using ES6 yet.

First, npm install mq-js.

    npm install mq-js --save

Now, create this simple mq.js file to set up your website breakpoints.

`````````````js
//mq.js file
"use strict";

import MQ from "mq-js";

//Define your Site break points here
const breakpoints = {
  small: 600,
  medium: 980,
  large: 1200
}

//Creates the media query functions
const mq = new MQ(breakpoints);

//Export mq by default
export default mq;

//Gives easy access to your site breakpoints
export { mq, breakpoints }
`````````````

Now import the `mq` variable into your main/module JavaScript file.

`````js
//module js file
"use strict";
import $ from 'jquery';

//import the mq variable that was created in the setup stage
import mq from "./mq";

$('.btn').click(function(e){
  e.preventDefault();

  //Use your breakpoints by parsing in a string
  mq.min('medium', (screen_width)=>{
    $(this).toggleClass('-active');

    //log the screen width at the time the button was clicked
    console.log(screen_width);
  })
})
`````

Available functions:

- [mq.min](https://dan503.github.io/mq-js/#mq-min)
- [mq.max](https://dan503.github.io/mq-js/#mq-max)
- [mq.inside](https://dan503.github.io/mq-js/#mq-inside)
- [mq.outside](https://dan503.github.io/mq-js/#mq-outside)

Full documentation can be found at https://dan503.github.io/mq-js/
