'use strict'

import * as del from 'del'

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories

	// Clean
	gulp.task('clean', (done) => {
		del.sync([[dirs.temporary].join('/')])
		done()
	})
}
