# mq-js

mq-js was inspired by the [mq-scss](https://www.npmjs.com/package/mq-scss) Sass mixin. I wanted to use media queries in JavaScript in a similar sort of way to how I was using media queries in my Sass code.

If you haven't looked into [mq-scss](https://www.npmjs.com/package/mq-scss) I highly recommend checking it out. It makes writing media queries far easier than any other method.

Full documentation for mq-js can be found at https://dan503.github.io/mq-js/

## Quick start guide

This documentation assumes that you have the ability to use ES6 JavaScript syntax in your project. mq-js will work in environments that don't support es6 JavaScript syntax however the syntax will be different to what is documented. Try out [Babel](https://babeljs.io/) if you aren't using ES6 in your projects yet.

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
  mq.min('medium', (screen_size)=>{
    $(this).toggleClass('-active');

    //log the screen height, width and ratio at the time the button was clicked
    console.log(screen_size);
  })
})
`````

## Core methods

- [mq.min](https://dan503.github.io/mq-js/#mq-min)
- [mq.max](https://dan503.github.io/mq-js/#mq-max)
- [mq.inside](https://dan503.github.io/mq-js/#mq-inside)
- [mq.outside](https://dan503.github.io/mq-js/#mq-outside)

note: You can add `Width` to the end of any of those methods and it will still be valid. For example, it is safe to use `mq.minWidth` instead of `mq.min` if you prefer the `minWidth` syntax as they have identical functionality.

## Plugins

### Height plugin

````js
import "mq-js/plugins/height";
````

The height plugin provides these methods:

- mq.minHeight
- mq.maxHeight
- mq.insideHeight
- mq.outsideHeight

[Read the full height plugin documentation.](https://dan503.github.io/mq-js/#-height-plugin)


### Orientation plugin

````js
import "mq-js/plugins/orientation";
````

The orientation plugin provides these methods:

- mq.orientation

[Read the full orientation plugin documentation.](https://dan503.github.io/mq-js/#-orientation-plugin)


### Ratio plugin

````js
import "mq-js/plugins/ratio";
````

The ratio plugin provides these methods:

- mq.ratio
- mq.minRatio
- mq.maxRatio
- mq.insideRatio
- mq.outsideRatio

[Read the full ratio plugin documentation.](https://dan503.github.io/mq-js/#-ratio-plugin)


### reactTo plugin

````js
import "mq-js/plugins/reactTo";
````

This gives you access to:

- mq.reactTo

This plugin is a bit different. It takes a function that returns an mq-js screen-check result as it's first parameter and a callback function as it's second parameter. It will then call the callback function every time the screen-check result changes from true to false or false to true.

````js
mq.reactTo(()=> mq.inside(800, 1000), (is_active, screen_size)=> {
  // is_active = did "mq.inside(800, 1000)" return true?
  // screen_size = an object holding the screen height, width, and ratio at the point when the callback was called
  console.log(is_active, screen_size);
});
````

[Read the full reactTo plugin documentation.](https://dan503.github.io/mq-js/#-react-to-plugin)

## Change Log

This change log only tracks changes to the functionality of the module.

### v2.1.0

- added the `reactTo` plugin

### v2.0.0

- **Breaking Change:** The `screen_size` variable shown in the Quick Start example used to output a number that represented the current screen width. It now outputs an object that contains information on the screen height, width, and ratio.
- added `height` plugin
- added `orientation` plugin
- added `ratio` plugin
