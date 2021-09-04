import { task, series } from 'gulp'
import { createAutoImportTask } from 'gulp-auto-imports'

const template = `
$format[imports]

export default function ( gulp, plugins, args, config, taskTarget, browserSyncInstance ) {
$format[functions]
}
`

const [generateTasksAutoLoader] = createAutoImportTask({
	sourceFolder: './gulp/tasks',
	fileExtension: 'ts',
	importerSettings: {
		preset: 'ts',
		template,
		format: {
			// eslint-disable-next-line quotes
			imports: `import $name from '$noExtPath'`,
			functions:
				'	$name(gulp, plugins, args, config, taskTarget, browserSyncInstance)',
		},
	},
})

task('default', series(generateTasksAutoLoader))
