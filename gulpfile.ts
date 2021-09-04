'use strict'

import * as gulp from 'gulp'
import * as gulpLoadPlugins from 'gulp-load-plugins'
import * as browserSyncLib from 'browser-sync'
import * as minimist from 'minimist'

import * as pjson from './package.json'

import { jsWatch } from './gulp/config/shared-vars'
import createTasks from './gulp/tasks/auto-imports'

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins()

const defaultNotification = function (err) {
	return {
		subtitle: err.plugin,
		message: err.message,
		sound: 'Funk',
		onLast: true,
	}
}

let config = { ...pjson.config, ...defaultNotification }

let args = minimist(process.argv.slice(2))
let dirs = config.directories
let taskTarget = args.production ? dirs.destination : dirs.temporary

// Create a new browserSync instance
let browserSync = browserSyncLib.create()

createTasks(gulp, plugins, args, config, taskTarget, browserSync)

// Compiles all the code
gulp.task(
	'compile',
	gulp.series(
		gulp.parallel(
			'copy',
			'pug',
			'imagemin',
			'sass',
			'modernizr',
			'browserify'
		)
	)
)

// Default task
gulp.task(
	'default',
	gulp.series(
		'clean',
		(done) => {
			jsWatch.isEnabled = true
			done()
		},
		'compile',
		'watch' //watch holds browsersync
	)
)

// Build production-ready code
gulp.task(
	'build',
	gulp.series(
		'clean',
		(done) => {
			jsWatch.isEnabled = true
			done()
		},
		'compile'
	)
)

// Server tasks with watch
gulp.task('serve', gulp.series('default'))

// Testing
gulp.task('test', gulp.series('eslint'))
