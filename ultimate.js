
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MQ = require('./index');

require('./plugins/height');
require('./plugins/orientation');
require('./plugins/ratio');
require('./plugins/reactTo');

exports.default =  MQ.default;
