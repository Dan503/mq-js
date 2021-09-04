'use strict'

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories
	let dest = [taskTarget].join('/')

	gulp.task('copy:icomoon', () => {
		return gulp
			.src([[dirs.source, '_icomoon/fonts/**/*'].join('/')])
			.pipe(gulp.dest([taskTarget, dirs.assets, 'icomoon'].join('/')))
	})

	// Copy
	gulp.task(
		'copy',
		gulp.parallel('copy:icomoon', () => {
			return gulp
				.src([
					[dirs.source, '**/*'].join('/'),
					'!' + [dirs.source, '{**/_*,**/_*/**}'].join('/'),
					'!' + [dirs.source, '**/*.pug'].join('/'),
				])
				.pipe(gulp.dest(dest))
		})
	)
}
