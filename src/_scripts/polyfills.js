console.log('Polyfills loaded 😊')

// Promise polyfill
if (!window.Promise) window.Promise = require('core-js/features/promise')

// Object.assign polyfill
if (!Object.assign) require('core-js/features/object/assign')

// Array.from polyfill (Needed for Babel [...array] transformation)
if (!Array.from) Array.from = require('core-js/features/array/from')
