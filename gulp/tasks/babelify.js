'use strict';

import fs from "fs";
// import browserify from "browserify";
import path from 'path';
import envify from 'envify';
import * as babel from 'babel-core';
import es2015 from "babel-preset-es2015";
import vsource from 'vinyl-source-stream';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;

  const src = [
    './' + [dirs.source, dirs.scripts, 'index.js'].join('/'),
    './' + [dirs.source, dirs.scripts, 'plugins/*.js'].join('/'),
  ];

  gulp.task('babelify', (done)=>{
    return Promise.all([
      babelify('index.js'),
      babelify('mq-js-plugins/*.js', 'plugins'),
    ])
    .catch(err => { throw new Error(err) })
  });

  function babelify(src, dest = ''){
    return new Promise((resolve, reject) => {
      gulp.src('./' + [dirs.source, dirs.scripts, src].join('/'))
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.rename({dirname: dest}))
      .pipe(gulp.dest('./'))
      .on('end', ()=>{
        console.log(`\nBabelified ${src}\n`);
        resolve();
      })
      .on('error', error => reject(err));
    })
  }
}
