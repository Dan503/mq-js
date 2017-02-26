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
    return new Promise((resolve, reject)=>{
      babel.transformFile(src, {
          presets: [es2015],
          babelrc: false
      }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.code);
          }
      });
    })
      .then((content)=>{
          console.log(`Babelifying ${src}.`);

          //Determines what the file name should be
          var stream = vsource('index.js');

          //generates the page content
          stream.end(content);

          //generates the file and signals task completion
          return stream.pipe(gulp.dest('./'));
      })
  });

}
