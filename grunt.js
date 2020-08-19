const sass = require('node-sass');

require('load-grunt-tasks')(grunt);

module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'main.css': 'main.scss'
                }
            }
        }
    });
    
    gulp.task('sass', function(){
        return gulp.src(['app/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app'));
    });
    
    
    
    grunt.registerTask('default', ['sass']);

}
