'use strict';

import path from 'path';
import glob from 'glob';
import browserify from 'browserify';
import watchify from 'watchify';
import envify from 'envify';
import babelify from 'babelify';
import _ from 'lodash';
import vsource from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';
import notifier from 'node-notifier';

import { jsWatch, notification_icon_location} from '../config/shared-vars';

let browserify_launch_pad = [];

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let entries = config.entries;

  function generate_browserify_tasks(done){
    glob('./' + path.join(dirs.source, dirs.scripts, entries.js), function(err, files) {
      if (err) {
        console.error(err);
      }

      return browserifyTasks(done, files);
    });
  }

  function browserifyTasks(done, files) {
    files.map((entry) => {

      const taskName = `browserify ${entry}`;

      browserify_launch_pad.push(taskName);

      gulp.task(taskName, (done)=>{
        let dest = path.resolve(taskTarget, dirs.assets);

        // Options
        let customOpts = {
          entries: [entry],
          debug: true,
          paths: [
            './src/_modules',
            './src/_scripts'
          ],
          transform: [
            babelify, // Enable ES6 features
            envify // Sets NODE_ENV for better optimization of npm packages
          ]
        };

        let bundler = browserify(customOpts);

        if (jsWatch.isEnabled) {
          // Setup Watchify for faster builds
          let opts = _.assign({}, watchify.args, customOpts);
          bundler = watchify(browserify(opts));

        }

        const jsErrorNotification = {title:'JS Error', message: 'Error running JS browserify'};

        let startTime = new Date().getTime();

        if (!args.production) {
          bundler.on('update', rebundle); // on any dep update, runs the bundler
          bundler.on('log', plugins.util.log); // output build logs to terminal
        }

        return bundler.bundle()
          .on('error', function(err) {
            notifier.notify({title: 'JS Error', message: err.loc ? `${path.basename(error.filename)} line ${error.loc.line}` : 'JS failed to compile', icon: notification_icon_location+'gulp-error.png'});
            plugins.util.log(
              plugins.util.colors.red.bold('Browserify compile error:'),
              '\n',
              plugins.util.colors.yellow(err.stack),
              '\n'
            );
            this.emit('end');
          })
          .pipe(vsource(entry))
          .pipe(buffer())
          .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(gulpif(args.production, plugins.uglify()))
          .pipe(plugins.rename(function(filepath) {
            // Remove 'source' directory as well as prefixed folder underscores
            // Ex: 'src/_scripts' --> '/scripts'
            filepath.dirname = filepath.dirname.replace(dirs.source, '').replace('_', '');
          }))
          .pipe(plugins.sourcemaps.write('./'))
          .pipe(gulp.dest(dest))
          // Show which file was bundled and how long it took
          .on('end', function() {
            let time = (new Date().getTime() - startTime) / 1000;
            console.log(
              plugins.util.colors.cyan(entry)
              + ' was browserified: '
              + plugins.util.colors.magenta(time + 's'));
            browserSync.reload('*.js');
            //done();
          });
      });
    });

    return gulp.parallel(...browserify_launch_pad)(done);

  };

  function copy_index_to_root(done){
    if (args.production){
      return gulp.src('./' + path.join(taskTarget, dirs.assets, dirs.scripts.replace(/^_/,''), 'index.js'))
        .pipe(plugins.rename({dirname: ''}))
        .pipe(gulp.dest('./'));
    } else {
      done();
    }
  }

  // Browserify Task
  gulp.task('browserify', gulp.series(
    generate_browserify_tasks,
    copy_index_to_root
  ));
}
