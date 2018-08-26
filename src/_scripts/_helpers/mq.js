
"use strict";

import MQ from '../../../ultimate';

const bp = {
  small: 600,
  medium: 980,
  large: 1200
}

const mq = new MQ(bp);

export default mq;
export { mq, bp }
