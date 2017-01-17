const gulp = require('gulp');
const eslint = require('gulp-eslint');
const chalk = require('chalk');

gulp.task('eslint', () => {
	return gulp.src('./src/js/**')
		.pipe(eslint())
		.pipe(eslint.results(results => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
    }))
    .pipe(eslint.format())
    .on('end', () => {
    	console.log(chalk.green('\nDone without errors.\n'));
    })
});

gulp.task('default', function() { 
  // place code for your default task here
});
