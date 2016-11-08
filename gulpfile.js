'use strict';
// Using vars and common functions due to Node 0.12 builds
var path = require('path');
var gulp = require('gulp');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var bump = require('gulp-bump');
var sequence = require('gulp-sequence');
var git = require('gulp-git');
var clean = require('gulp-clean');
var jsdoc = require('gulp-jsdoc3');

gulp.task('nsp', function(cb) {
    return nsp({package: __dirname + '/package.json'}, cb);
});

gulp.task('clean-docs', function() {
    return gulp.src('docs', {read: false})
        .pipe(clean());
});

gulp.task('jsdoc', ['clean-docs', 'babel'], function() {
    return gulp.src(['./lib/**/*.js', 'README.md'], {read: false})
        .pipe(jsdoc(require('./jsdoc.json')));
});

gulp.task('eslint', function() {
    return gulp.src(['**/*.js', '!lib/**/*.js'])
        .pipe(excludeGitignore())
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

gulp.task('clean-lib', function() {
    return gulp.src('lib', {read: false})
        .pipe(clean());
});

gulp.task('babel', ['clean-lib'], function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            plugins: ['transform-runtime'],
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('pre-test', ['babel'], function() {
    return gulp.src('lib/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function(cb) {
    var mochaErr;

    gulp.src('test/**/*.js')
        .pipe(plumber())
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({thresholds: {global: 100}}))
        .on('end', function() {
            cb(mochaErr);
        });
});

gulp.task('coveralls', ['test'], function() {
    if (!process.env.CI) {
        return;
    }

    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
        .pipe(coveralls());
});

gulp.task('watch', function() {
    gulp.watch('**/*.js', ['build']);
});

gulp.task('bump', function() {
    if (process.argv.length < 3) {
        throw new Error('Please provide an argument with increase type: --patch, --minor or --major');
    }

    var type = process.argv[process.argv.length - 1].slice(2).toLowerCase();
    if (type !== 'patch' && type !== 'minor' && type !== 'major') {
        throw new Error('Please provide a valid version increase type: --patch, --minor or --major');
    }

    return gulp.src('./package.json')
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function() {
    delete require.cache[require.resolve('./package.json')];
    var versionNumber = require('./package.json').version;
    var version = 'v' + versionNumber;

    if (typeof versionNumber !== 'string') {
        throw new Error('Current package.json version is invalid.');
    }

    return gulp.src('./package.json')
        .pipe(git.add())
        .pipe(git.commit('Release ' + version, {args: '--allow-empty'}))
        .pipe(git.tag(version, 'Release ' + version, {args: '-a'}, function(err) {
            if (!err) git.push('origin', null, {args: '--tags :'});
        }));
});

gulp.task('npm', ['tag'], function(cb) {
    require('child_process')
        .spawn('npm', ['publish'], {stdio: 'inherit'})
        .on('close', cb);
});

// Publishes package to npm
gulp.task('publish', function(cb) {
    sequence('build', 'npm', cb);
});

// Does full a build
gulp.task('build', ['nsp', 'eslint', 'coveralls']);
