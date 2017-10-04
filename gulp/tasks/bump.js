'use strict';

// dependencies
import gulp from 'gulp';
import git from 'gulp-git';
import bump from 'gulp-bump';
import gutil from 'gulp-util';
import minimist from 'minimist';

const reload = require('require-reload')(require);

const args = minimist(process.argv.slice(2));

const releaseBranch = 'release/version-update';

/**
 * SIMPLE VERSION BUMPING
 *
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp bump --patch   # makes v0.1.0 → v0.1.1
 *     gulp bump --minor   # makes v0.1.1 → v0.2.0
 *     gulp bump --major   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible change.
 *
**/

/**
 * FULL GIT RELEASES
 *
 * You can use the commands
 *
 *     gulp release           # no version number change
 *     gulp release --patch   # makes v0.1.0 → v0.1.1
 *     gulp release --minor   # makes v0.1.1 → v0.2.0
 *     gulp release --major   # makes v0.2.1 → v1.0.0
 *
 * To do a full git flow release process automatically.
 * All changes must be committed to git before running this task
 */

function getBumpType(){
	if (args.patch && args.minor ||	args.minor && args.major ||	args.major && args.patch) {
		throw '\nYou can not use more than one version bump type at a time\n';
	}

	if (args.patch){
		return 'patch';
	} else if (args.minor){
		return 'minor';
	} else if (args.major) {
		return 'major';
	} else {
		return false;
	}
}

function checkError(err){
	if (err) throw err;
}

//Bump up the current version number
function bumpVersion(importance){
	return function bump_version (done){
		if (!importance) throw `\nAn importance must be specified for a version bump to occur.
	Valid importances: "--patch", "--minor", "--major"\n`;
		// get all the files to bump version in
		return gulp.src('./package.json')
			// bump the version number in those files
			.pipe(bump({type: importance}))
			// save it back to filesystem
			.pipe(gulp.dest('./'))
			//commit the changed version number
			.pipe(git.commit(`${importance} version bump`))
	}
}

//Tag current version number in git
function tag_version(){
	return new Promise((resolve, reject)=>{
		const pkg = reload('../../package.json');
    const tag = `v${pkg.version}`;
    gutil.log('Tagging as: '+gutil.colors.cyan(tag));
    git.tag(tag, `Tagging as ${tag}`, (err)=>{
			checkError(err);
			resolve(tag);
    })
	})
}

//Bump the version number in package.json then commit and tag in git
function versionBump(importance){
	return (done)=>{
		return gulp.series(bumpVersion(importance), tag_version)(done);
	}
}


///GIT PROMISES

function create_branch(branch){
	return new Promise((resolve, reject)=>{
		git.checkout(branch, {args:'-b'}, (err)=>{
			checkError(err);
			resolve();
		});
	})
}

function check_out(branch){
	return new Promise((resolve, reject)=>{
		git.checkout(branch, (err)=>{
			checkError(err);
			resolve()
		});
	})
};

function merge_into_current(branch){
	return new Promise((resolve, reject)=>{
		git.merge(branch, {args:'--no-ff'}, (err)=>{
			checkError(err);
			resolve()
		});
	})
};

function delete_branch(branch){
	return new Promise((resolve, reject)=>{
		git.branch(branch, {args:'-d'}, (err)=>{
			checkError(err);
			resolve();
		});
	})
};


//RELEASE FUNCTIONS

function startRelease(importance = false){
	return function start_release (done) {

		let create_release_branch = ()=> create_branch(releaseBranch);

		return gulp.series(
			create_release_branch,
			(done)=> {
				if (importance !== false){
					return gulp.series(versionBump(importance))(done);
				} else {
					done();
				}
			}
		)(done);
	}
}

function finish_release(done){
	return check_out('master')
		.then(()=> merge_into_current(releaseBranch))
		.then(()=> check_out('develop'))
		.then(()=> merge_into_current(releaseBranch))
		.then(()=> delete_branch(releaseBranch))
}

//Do a full Git Flow release which can optionally include a version bump
function release(importance) {
	return (done)=>{
		return gulp.series(
			startRelease(importance),
			finish_release
		)(done);
	}
}


//TASKS

gulp.task('bump', versionBump(getBumpType()));

gulp.task('release', release(getBumpType()));

export default ()=>{}
