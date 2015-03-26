var gulp = require('gulp');
var del = require('del');

gulp.task('remove-from-public:swagger-ui', function(cb){
    del(['public/api-docs/swagger-ui'], cb)
});

gulp.task('add-to-public:swagger-ui', ['remove-from-public:swagger-ui'], function() {
    return gulp.src(['node_modules/swagger-ui/dist/!(index.html){,/**}'])
        .pipe(gulp.dest('public/api-docs/swagger-ui/dist'));
});

gulp.task('default', ['add-to-public:swagger-ui']);