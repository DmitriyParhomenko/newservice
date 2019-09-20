  var gulp     = require('gulp'),
  uglify       = require('gulp-uglify-es').default,
  concat       = require('gulp-concat'),
  csso         = require('gulp-csso'), // Минификация CSS
  scss         = require('gulp-sass'),
  imagemin     = require('gulp-imagemin'),
  cache        = require('gulp-cache'),
  browserSync  = require('browser-sync'),
  notify       = require('gulp-notify'),
  spritesmith  = require('gulp.spritesmith'),
  htmlmin      = require('gulp-htmlmin'),
  autoprefixer = require('gulp-autoprefixer'),
  px2rem       = require('gulp-px2rem'),
  svg2png      = require('gulp-svg2png'),
  replace      = require('gulp-replace'),
  rename       = require('gulp-rename'), //пока не используется
  tinypng      = require('gulp-tinypng'),
  connect      = require('connect'); // Webserver
  var reload   = browserSync.reload;




var px2remOptions = {
    replace: true
};

var paths = {
  build: {
    css: 'build/css',
    js: 'build/js',
    html: 'build',
    img: 'build/img',
    no_svg: 'build/img/no-svg'
  },
  sources: {
    html: 'sources/*.html',
    css: 'sources/css/style.scss',
    js: 'sources/js/**/**/*.js',
    sprite: 'sources/sprite/*.png',
    no_svg: 'sources/img/svg/*.svg',
    img: 'sources/img/**/**/**/**/*'
  }
};

gulp.task("css:sources", function () {
    return gulp.src(paths.sources.css)
    .pipe(scss().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sсss Error!"
      } ) )

    )
    .pipe(px2rem(px2remOptions))
    .pipe(autoprefixer('last 100 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest("sources/css"));
});

gulp.task("css:build", ['css:sources'], function () {
    return gulp.src("sources/css/*.css")
    .pipe(csso())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.build.css))
    .pipe(reload({stream: true}));
});

// Собираем JS
gulp.task('js', function () {
    return gulp.src("sources/js/*.js")
        .pipe(rename("script.min.js"))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest(paths.build.js));
});

// gulp.task('js', function() {
//     gulp.src(paths.sources.js)
//     .pipe(uglify().on( 'error', notify.onError(
//       {
//         message: "<%= error.message %>",
//         title  : "JS Error!"
//       } ) )
//     )
//     .pipe(concat('script.min.js'))
//     .pipe(gulp.dest(paths.build.js))
//     .pipe(reload({stream: true}));
// });

gulp.task('html', function(){
  gulp.src(paths.sources.html)
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(paths.build.html))
  .pipe(reload({stream:true}));
});

gulp.task('img', function() {
  gulp.src(paths.sources.img)
  .pipe(cache(imagemin()))
  .pipe(gulp.dest(paths.build.img));
});

gulp.task('svg2png', function () {
    gulp.src(paths.sources.no_svg)
        .pipe(svg2png())
        .pipe(tinypng('mtEB5nicxEeggPfCFboISe-sv6175DXJ'))
        .pipe(gulp.dest(paths.build.no_svg));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.sources.sprite).pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../img/sprite.png',
      padding: 30,
      algorithm: 'top-down'
    }));


  spriteData.img.pipe(gulp.dest(paths.build.img));
  gulp.src(paths.build.img + '/sprite.png').pipe(tinypng('mtEB5nicxEeggPfCFboISe-sv6175DXJ')).pipe(gulp.dest(paths.build.img)); // путь, куда сохраняем картинку
  spriteData.css.pipe(replace('px', 'PX')).pipe(gulp.dest('sources/css')); // путь, куда сохраняем стили
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    port: 8080,
    open: true,
    notify: false
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

gulp.task('build', function() {
  var buildFiles = gulp.src([
    'dev/*.html'
    ]).pipe(gulp.dest('app'));

  var buildFonts = gulp.src([
    'dev/fonts/**/*'
    ]).pipe(gulp.dest('app/fonts'));

  var buildCss = gulp.src([
    'dev/css/**/*'
    ]).pipe(gulp.dest('app/css'));

  var buildJs = gulp.src([
    'dev/js/**/*',
    ]).pipe(gulp.dest('app/js'));
});

gulp.task('watcher',function(){
  gulp.watch(paths.sources.css, ['css:build']);
  gulp.watch(paths.sources.js, ['js']);
  gulp.watch(paths.sources.html, ['html']);
  gulp.watch(paths.sources.img, ['img']);
  gulp.watch(paths.sources.sprite, ['sprite']);
  gulp.watch(paths.sources.no_svg, ['svg2png']);
});


gulp.task('default', ['watcher', 'browser-sync']);
gulp.task('clearcache', function () { return cache.clearAll(); });
