'use strict'

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories
	let dest = [taskTarget, dirs.assets, dirs.images.replace(/^_/, '')].join('/')

	// Imagemin
	gulp.task('imagemin', () => {
		return gulp
			.src(
				[dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'].join('/')
			)
			.pipe(gulp.dest(dest))
	})
}
