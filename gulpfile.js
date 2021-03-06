const
	gulp = require( 'gulp' ),
	browserSync = require( 'browser-sync' ),
	$ = require( 'gulp-load-plugins' )( {lazy: true} ),
	uglify = require('gulp-uglify-es').default,
	cssmin = require('gulp-cssmin'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpResolveUrl = require('gulp-resolve-url');

gulp.task( 'styles', function () {
	return gulp
		.src( './src/sass/**/*.scss' )
		.pipe(sourcemaps.init())
		.pipe( $.sass({outputStyle: 'compressed'}).on( 'error', $.sass.logError ) )
		.pipe( $.autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
		.pipe(gulpResolveUrl())
		.pipe(cssmin() )
		.pipe(sourcemaps.write(''))
		.pipe( gulp.dest( 'public/css' ) )
		.pipe( browserSync.reload( {stream: true} ) );
} );

gulp.task('vendorScripts', function() {
	gulp.src('./src/js/vendor/**/*.js')
		.pipe(gulp.dest('public/js/vendor'));
});

gulp.task('vendorCSS', function() {
	gulp.src('./src/vendor-css/**/*.css')
		.pipe(gulp.dest('public/vendor-css'));
});

gulp.task('php', function() {
	gulp.src('./src/*.php')
		.pipe(gulp.dest('public/'));
});

gulp.task('mailer', function() {
	gulp.src('./src/PHPMailer-master/**/*')
		.pipe(gulp.dest('public/PHPMailer-master'));
});



// js urls arent corectly rewritten, so to open a page from public/html file, rewrite publicj/js/app.js url: instead
// ../music/shot.mp3 , type: /music/shot/mp3

gulp.task( 'scripts', function () {
	return gulp
		.src( [
			'./src/js/!(vendor)**/!(main)*.js',
			'./src/js/index.js'

		] )
		.pipe(sourcemaps.init())
		.pipe( $.plumber() )
		.pipe( $.babel() )
		.pipe(uglify())
		.pipe(sourcemaps.write(''))
		.pipe( gulp.dest( 'public/js' ) )
		.pipe( browserSync.reload( {stream: true} ) );
} );

// Optimizes the images that exists
gulp.task( 'images', function () {
	return gulp
		.src( 'src/img/**' )
		.pipe( $.changed( 'img' ) )
		.pipe( $.imagemin( {
			// Lossless conversion to progressive JPGs
			progressive: true,
			// Interlace GIFs for progressive rendering
			interlaced: true
		} ) )
		.pipe( gulp.dest( 'public/img' ) )
		.pipe( $.size( {title: 'img'} ) );
} );


gulp.task('fonts', function () {
	return gulp
		.src( 'src/font/**' )
		.pipe(gulp.dest('public/font'));
});

gulp.task( 'html', function () {
	return gulp
		.src( './src/**/*.html' )
		.pipe( gulp.dest( 'public/' ) );
} );

gulp.task( 'browser-sync', ['styles', 'scripts','html'], function () {
	browserSync( {
		server: {
			baseDir: './public/',
			injectChanges: true // this is new
		}
	} );
} );

gulp.task( 'deploy', function () {
	return gulp
		.src( './public/**/*' )
		.pipe( ghPages() );
} );

gulp.task( 'watch', function () {
	// Watch .html files
	gulp.watch( 'src/**/*.html', ['html', browserSync.reload] );
	gulp.watch( 'public/*.html' ).on( 'change', browserSync.reload );
	// Watch .sass files
	gulp.watch( 'src/sass/**/*.scss', ['styles', browserSync.reload] );
	// Watch .js files
	gulp.watch( 'src/js/*.js', ['scripts', browserSync.reload] );
	// Watch .js files
	gulp.watch( 'src/js/vendor/*', ['vendorScripts', browserSync.reload] );
	// Watch vendor css
	gulp.watch( 'src/vendor-css/*', ['vendorCSS', browserSync.reload] );
	// Watch php files
	gulp.watch( 'src/*.php', ['php', browserSync.reload] );
	// Watch image files
	gulp.watch( 'src/img/**/*', ['images', browserSync.reload] );
	//Watch fonts
	gulp.watch( 'src/fonts/**/*', ['fonts', browserSync.reload] );
} );

gulp.task( 'default', function () {
	gulp.start(
		'styles',
		'vendorScripts',
		'vendorCSS',
		'php',
		'mailer',
		'scripts',
		'images',
		'html',
		'browser-sync',
		'fonts',
		'watch'
	);
} );
