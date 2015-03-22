var gulp = require('gulp');
var del = require('del');

gulp.task('clean-public:swagger-ui', function(cb){
    del(['public/api-docs/swagger-ui/dist'], cb)
});

gulp.task('add-public:swagger-ui', ['clean-public:swagger-ui'], function() {
    return gulp.src(['node_modules/swagger-ui/dist/!(index.html){,/**}'])
    .pipe(gulp.dest('public/api-docs/swagger-ui/dist'));
});

gulp.task('default', ['add-public:swagger-ui']);