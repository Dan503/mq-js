
"use strict";

import MQ from './index';

const bp = {
  small: 600,
  medium: 980,
  large: 1200
};

const mq = new MQ({
  breakpoints: bp,
});

const mq_s2L = new MQ({
  breakpoints: bp,
  largestFirst: false,
});

export default mq;

export { mq, mq_s2L };
