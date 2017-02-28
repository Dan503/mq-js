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

  const src = './' + path.join(dirs.source, dirs.scripts, 'index.js');

  gulp.task('babelify', (done)=>{
    return gulp.src(src)
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.rename({dirname: ''}))
      .pipe(gulp.dest('./'))
      .on('end', ()=>{
        console.log('Babelified the index.js file');
      });
  });
}
