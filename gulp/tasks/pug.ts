'use strict'

import * as fs from 'fs'
import * as foldero from 'foldero'
import * as pug from 'pug'
import * as notifier from 'node-notifier'
import { notification_icon_location, pjson } from '../config/shared-vars'
import * as chalk from 'chalk'
import * as marked from 'marked'

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories
	let dest = [taskTarget].join('/')
	let dataPath = [dirs.source, dirs.data].join('/')

	// Jade template compile
	gulp.task('pug:compile', (done) => {
		let siteData = {}
		if (fs.existsSync(dataPath)) {
			// Convert directory to JS Object
			siteData = foldero(dataPath, {
				recurse: true,
				whitelist: '(.*/)*.+.(json|ya?ml)$',
				loader: function loadAsString(file) {
					let json = {}
					try {
						json = JSON.parse(fs.readFileSync(file, 'utf8'))
					} catch (e) {
						console.log('Error Parsing DATA file: ' + file)
						console.log('==== Details Below ====')
						console.log(e)
					}
					done()
					return json
				},
			})
		}

		// Add --debug option to your gulp task to view
		// what data is being loaded into your templates
		if (args.debug) {
			console.log('==== DEBUG: site.data being injected to templates ====')
			console.log(siteData)
			console.log(
				'\n==== DEBUG: package.json config being injected to templates ===='
			)
			console.log(config)
		}

		const pugFilters = [marked]

		let itteration = 0

		return gulp
			.src([
				[dirs.source, '**/*.pug'].join('/'),
				'!' + [dirs.source, '{**/_*,**/_*/**}'].join('/'),
			])
			.pipe(
				plugins.pug({
					//pug: pug,
					pretty: true,
					basedir: './' + [dirs.source].join('/'),
					filters: {
						markdown: marked,
					},
					locals: {
						args,
						require,
						pkg: pjson,
						config,
						pugFilters,
						compile: pug.compile,
						debug: true,
						site: {
							data: siteData,
						},
					},
				})
			)
			.pipe(
				plugins.htmlmin({
					collapseBooleanAttributes: true,
					conservativeCollapse: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
				})
			)
			.pipe(gulp.dest(dest))
			.on('end', browserSync.reload)
	})

	gulp.task('pug', gulp.series('symbolize-svgs', 'pug:compile'))
}
