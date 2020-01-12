var gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cssbeautify    = require("gulp-cssbeautify"),
	cleanCSS       = require('gulp-clean-css'),
	cache          = require('gulp-cache'),
	imagemin       = require('gulp-imagemin'),
	jpegrecompress = require('imagemin-jpeg-recompress'),
	pngquant       = require('imagemin-pngquant'),
	autoprefixer   = require('gulp-autoprefixer'),
	ftp            = require('vinyl-ftp'),
	rimraf         = require('gulp-rimraf'),
	critical       = require('critical').stream,
	syntax         = 'scss',
	path           = {
		app: {
			html:  'app/*.html',
			libs:  'app/assets/libs/',
			js:    'app/assets/js',
			css:   'app/assets/css',
			img:   'app/assets/img',
			fonts: 'app/assets/fonts',
			sass:  'app/assets/' + syntax + '/',
		},
		build: {
			js:    'build/assets/js',
			css:   'build/assets/css',
			img:   'build/assets/img',
			fonts: 'build/assets/fonts',
		}
	};


gulp.task('script', function() {
	return gulp.src([
		path.app.libs + 'jquery.lazy-master/jquery.lazy.min.js',
		path.app.libs + 'ScrollToFixed/jquery-scrolltofixed-min.js',
		path.app.libs + 'jquery-popup-overlay-gh-pages/jquery.popupoverlay.js',
		path.app.libs + 'jquery-validation-1.19.0/dist/jquery.validate.min.js',
		path.app.libs + 'ihavecookies/jquery.ihavecookies.min.js',
		path.app.libs + 'device/device.js'
	])
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.app.js))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function() {
	return gulp.src(path.app.sass + '**/*.' + syntax + '')
	.pipe(sass())
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 15 versions']
	}))
	.pipe(cssbeautify())
	.pipe(concat("style.css"))
	.pipe(gulp.dest(path.app.css))
	.pipe(cleanCSS())
	.pipe(concat("style.min.css"))
	.pipe(gulp.dest(path.app.css))
	.pipe(browserSync.stream())
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('clean:build', function () {
	return gulp.src("./build", { read: false }).pipe(rimraf());
});

gulp.task('html:build', function () {
	return buildFiles = gulp.src(path.app.html)
	.pipe(gulp.dest('build/'));
});

gulp.task('css:build', function () {
	return gulp.src(path.app.css + '**/*').pipe(gulp.dest(path.build.css));
});
gulp.task('js:build', function () {
	return gulp.src(path.app.js + '**/*').pipe(gulp.dest(path.build.js));
});
gulp.task('fonts:build', function () {
	return gulp.src(path.app.fonts + '**/*').pipe(gulp.dest(path.build.fonts));
});
gulp.task('image:build', function () {
	return gulp.src(path.app.img + '**/*').pipe(cache(imagemin([
		imagemin.gifsicle({ interlaced: true }),
		jpegrecompress({
		  progressive: true,
		  max: 90,
		  min: 80
		}),
		pngquant(),
		imagemin.svgo({ plugins: [{ removeViewBox: false }] })
	  ]))).pipe(gulp.dest(path.build.img));
});

gulp.task("build",
  gulp.series(
    "clean:build",
    gulp.parallel(
		"html:build",
		"css:build",
		"js:build",
		"fonts:build",
		'image:build'
	)
  )
);

gulp.task('clearcache', function () {
	cache.clearAll();
});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'whoami.ftp.tools',
		user:      'user',
		password:  'password',
		parallel:  10
	});

	var globs = [
	'build/**'
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/'));

});

gulp.task('critical', function() {
	return gulp.src('build/*.html')
	.pipe(critical({
		base: 'build/',
		pathPrefix: '',
		inline: true,
		minify: true,
		css: [path.build.css + 'style.min.css']
	}))
	.pipe(gulp.dest('build'));
});

gulp.task('html', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch(path.app.html, gulp.parallel('html'));
	gulp.watch(path.app.sass + '**/*.' + syntax + '', gulp.parallel('style'));
	gulp.watch([path.app.libs + '**/*.js', path.app.js + 'custom.js'], gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('style', 'script', 'browser-sync', 'watch'));
