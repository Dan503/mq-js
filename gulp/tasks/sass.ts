'use strict'

import * as path from 'path'
import * as autoprefixer from 'autoprefixer'
import * as px2rem from 'postcss-pxtorem'
import * as gulpif from 'gulp-if'
import * as notifier from 'node-notifier'
import * as chalk from 'chalk'
import { notification_icon_location } from '../config/shared-vars'
import * as gulpSass from 'gulp-sass'
import * as dartSass from 'sass'

const sass = gulpSass(dartSass)

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories
	let entries = config.entries
	let dest = [taskTarget, dirs.assets, dirs.styles.replace(/^_/, '')].join('/')

	const px2rem_settings = {
		rootValue: 10,
		propWhiteList: ['font', 'font-size', 'letter-spacing'],
		replace: false,
	}

	// Sass compilation
	gulp.task('sass', () => {
		return gulp
			.src([
				[dirs.source, dirs.styles, '*.scss'].join('/'),
				'!' + [dirs.source, dirs.styles, '_*.scss'].join('/'),
			])
			.pipe(plugins.wait(100)) //Helps prevent odd file not found error
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sassGlob())
			.pipe(
				sass({
					outputStyle: 'expanded',
					precision: 10,
					includePaths: [
						[dirs.source, dirs.styles].join('/'),
						[dirs.source, dirs.modules].join('/'),
						['node_modules'].join('/'),
					],
				}).on('error', sass.logError)
			)
			.pipe(
				plugins.postcss([
					autoprefixer({ grid: 'autoplace' }),
					px2rem(px2rem_settings),
				])
			)
			.pipe(
				plugins.rename(function (path) {
					// Remove 'source' directory as well as prefixed folder underscores
					// Ex: 'src/_styles' --> '/styles'
					path.dirname = path.dirname
						.replace(dirs.source, '')
						.replace('_', '')
				})
			)
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(dest))
			.pipe(browserSync.stream({ match: '**/*.css' }))
	})
}
