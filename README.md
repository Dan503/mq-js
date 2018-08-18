[![Visit the mq-js website](readme-logo-image.jpg)](https://dan503.github.io/mq-js/)

mq-js was inspired by the [mq-scss](https://www.npmjs.com/package/mq-scss) Sass mixin. I wanted to use media queries in JavaScript in a similar sort of way to how I was using media queries in my Sass code.

Full documentation for mq-js can be found at https://dan503.github.io/mq-js/

## Quick start guide

This documentation assumes that you have the ability to use ES6 JavaScript syntax in your project. mq-js will work in environments that don't support es6 JavaScript syntax however the syntax will be different to what is documented. [View the full documentation](https://dan503.github.io/mq-js/#quick-start) for ES5 (IE friendly) examples.

First, install mq-js using npm. (If you are new to Node and npm, [read this beginners guide](https://codeburst.io/getting-started-with-node-js-a-beginners-guide-b03e25bca71b) to get set up)

    npm install mq-js --save

Now, create this simple mq.js file to set up your website breakpoints.

`````````````js
///////////////////
// "mq.js" file //
/////////////////

import MQ from "mq-js";

//Define your Site break points here
const bp = {
  small: 600,
  medium: 980,
  large: 1200
}

//Creates the media query functions
const mq = new MQ(bp);

//Export mq by default
export default mq;

//Gives easy access to your site breakpoints
export { mq, bp }
`````````````

Now import the `mq` variable into your main/module JavaScript file.

`````js
////////////////////////
// Component js file //
//////////////////////

// import the mq variable that was created in the setup stage
import mq from "../mq";

// Alternatively import both the mq variable and the website breakpoints
// (Use one line or the other, do not use both import statements)
import { mq, bp } from "../mq";

document.querySelector('#button').onclick = function(e) {
  e.preventDefault();

  //Use your breakpoints by parsing in a string
  mq.min('medium', screen_size => {
    this.classList.toggle('-active');

    //log the screen height, width and ratio at the time the button was clicked
    console.log(screen_size);
  })

  //Alternatively, use it in an if statement
  if (mq.max('small')) {
    // Do stuff for screens that are up to (and including) the "small" breakpoint width
  }

  //You can also use custom values
  if (mq.min(1000)) {
    // Do stuff for screens that are greater than 1000px wide
  }

  //If you imported the breakpoints, you can use tweaked versions of them
  if (mq.inside(bp.small + 50, bp.medium - 100)) {
    // Do stuff for screens that are between the "small" breakpoint + 50px
    // and the "medium" breakpoint - 100px
  }
}
`````

**Note:** `mq.max` is _inclusive_ of the given screen size and `mq.min` is _exclusive_ of the given screen size. This is to avoid any potential 1px overlap issues where both statements return true at the same time. It is also designed to align with how mq-scss works.

## Core methods

- [mq.max](https://dan503.github.io/mq-js/#mq-max)
- [mq.min](https://dan503.github.io/mq-js/#mq-min)
- [mq.inside](https://dan503.github.io/mq-js/#mq-inside)
- [mq.outside](https://dan503.github.io/mq-js/#mq-outside)

**Note:** You can add `Width` to the end of any of those methods and it will still be valid. For example, it is safe to use `mq.minWidth` instead of `mq.min` if you prefer the `minWidth` syntax as they have identical functionality.

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

[Read the full height plugin documentation.](https://dan503.github.io/mq-js/#height-plugin)


### Orientation plugin

````js
import "mq-js/plugins/orientation";
````

The orientation plugin provides these methods:

- mq.orientation

[Read the full orientation plugin documentation.](https://dan503.github.io/mq-js/#orientation-plugin)


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

[Read the full ratio plugin documentation.](https://dan503.github.io/mq-js/#ratio-plugin)


### reactTo plugin

````js
import "mq-js/plugins/reactTo";
````

This gives you access to:

- mq.reactTo

This plugin is a bit different. It takes a function that returns an mq-js screen-check result as it's first parameter and a callback function as it's second parameter. It will then call the callback function every time the screen-check result changes from true to false or false to true.

````js
mq.reactTo(()=> mq.inside(800, 1000), (is_active, screen_size) => {
  // is_active = did "mq.inside(800, 1000)" return true?
  // screen_size = an object holding the screen height, width, and ratio at the point when the callback was called
  console.log(is_active, screen_size);
});
````

[Read the full reactTo plugin documentation.](https://dan503.github.io/mq-js/#reactto-plugin)

The mq-js change log is available on the [mq-js GitHub releases page](https://github.com/Dan503/mq-js/releases)
