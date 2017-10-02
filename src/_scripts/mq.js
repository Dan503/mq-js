
"use strict";

import MQ from './index';

import './plugins/height';
import './plugins/orientation';
import './plugins/ratio';

const breakpoints = {
  small: 600,
  medium: 980,
  large: 1200
}

const mq = new MQ(breakpoints);

export default mq;
export { mq, breakpoints }
