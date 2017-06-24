import gulp from 'gulp';
import requireDir from 'require-dir';
import jsonServer from 'gulp-json-srv';

requireDir('./gulp', { recurse: false });



// Default task to start development. Just type `gulp`.
gulp.task('default', ['server']);

gulp.task('json-server', function () {
    jsonServer.start();
});


gulp.task('default', ['server', 'json-server']);