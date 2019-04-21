var glob = require('glob');
var path = require('path');

var gulp 	= require('gulp');
var plugins = require('gulp-load-plugins')();

var utils = require('./utils/utils');

/********************************************
*			配置文件和路径
*********************************************/

var config = require('../config/');
var paths = config.paths;


/********************************************
*   		加载编译生成任务
*********************************************/

var buildTasks = utils.loadTasks(gulp, plugins, paths);

gulp.task('build', buildTasks);

/*********************************************
*				 其他任务
**********************************************/

// 本地服务器指向生成文件夹
gulp.task('connect', function() {
	plugins.connect.server({
		root: config.destDir,
		port: config.port || 3333,
		livereload: true
	});
});


// 文件更改时重新运行任务
gulp.task('watch', function() {
	// 模板更改时重新编译 .html 页面
	plugins.watch(paths.app.templates, function() {
	    gulp.start('app-pages');
	});

	// 当上下文文件更改时重新编译 .html 页面
	plugins.watch(config.srcDir + "/**/.context.js", function() {
	    gulp.start('app-pages');
	});

	// 当脚本更改时，重新编译脚本
	plugins.watch(paths.app.scripts, function() {
	    gulp.start('app-scripts');
	});

	// 当样式更改时，重新编译样式
	plugins.watch(paths.app.styles, function() {
	    gulp.start('app-styles');
	});

	// 当主题更改时，重新编译主题
	plugins.watch(paths.app.themes, function() {
	    gulp.start('app-themes');
	});
});

// 生成并部署到Github页面
gulp.task('deploy', ['build'], function() {
	return gulp.src('../dist/**/*')
		.pipe(plugins.ghPages({
			cacheDir: '../.deploy'
		}));
});



/********************************************
*				主任务
*********************************************/


// 运行此任务进行开发
gulp.task('develop', [
	'build',
	'watch',
	'connect'
]);

gulp.task('default', ['develop']);
