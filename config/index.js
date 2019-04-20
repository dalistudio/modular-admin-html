var path = require('path');

var rootDir = path.resolve("../");					// 根目录
var srcDir = path.resolve("../src");				// 源代码文件的目录
var destDir = path.resolve("../dist");				// 编译生成的目录
var npmDir =  path.resolve("../node_modules");		// Npm 依赖关系文件的目录

var config = {
	rootDir: rootDir,
	srcDir: srcDir,
	destDir: destDir,
	npmDir: npmDir,
	port: 4000,
	paths: {}
};

// 第三方库（Vendor）的路径
config.paths.vendor = {
	scripts: [
		npmDir + '/jquery/dist/jquery.js',
		npmDir + '/jquery-flot/jquery.flot.js',
		npmDir + '/jquery-flot/jquery.flot.resize.js',
		npmDir + '/jquery-flot/jquery.flot.pie.js',
		npmDir + '/jquery-flot/jquery.flot.time.js',
		npmDir + '/jquery.flot.tooltip/js/jquery.flot.tooltip.js',
		npmDir + '/jquery-validation/dist/jquery.validate.js',
		npmDir + '/jquery-sparkline/jquery.sparkline.js',
		npmDir + '/jqvmap/dist/jquery.vmap.js',
		npmDir + '/jqvmap/dist/maps/jquery.vmap.world.js',
		npmDir + '/metismenu/dist/metisMenu.js',
		npmDir + '/nprogress/nprogress.js',
		npmDir + '/quill/dist/quill.js',
		npmDir + '/responsive-toolkit/dist/bootstrap-toolkit.js',
		npmDir + '/sortablejs/Sortable.js',
		npmDir + '/tether/dist/js/tether.js',
		npmDir + '/tinycolor2/tinycolor.js',
		npmDir + '/dropzone/dist/dropzone.js',
		npmDir + '/jquery-touchswipe/jquery.touchSwipe.js',
		npmDir + '/jquery.browser/dist/jquery.browser.js',
		npmDir + '/popper.js/dist/umd/popper.js',
		npmDir + '/bootstrap/dist/js/bootstrap.js',
		npmDir + '/raphael/raphael.js',
		npmDir + '/morris.js/morris.js',
	],
	styles: [
		npmDir + '/animate.css/animate.css',
		npmDir + '/font-awesome/css/font-awesome.css',
		npmDir + '/jqvmap/dist/jqvmap.css',
		npmDir + '/metismenu/dist/metisMenu.css',
		npmDir + '/nprogress/nprogress.css',
		npmDir + '/dropzone/dist/dropzone.css',
		npmDir + '/quill/dist/quill.core.css',
		npmDir + '/quill/dist/quill.snow.css',
		npmDir + '/morris.js/morris.css',
		npmDir + '/bootstrap/dist/css/bootstrap.css',
	],
	fonts: [
		npmDir + '/font-awesome/fonts/*'
	],
	assets: [],
};

// 应用程序（App）的路径
config.paths.app = {
	scripts: [
		srcDir + "/config.js",
		srcDir + "/**/!(_context|config|main|*-helper)*.js",
		srcDir + "/main.js",
		"!" + srcDir + "/_vendor/**"
	],
	styles: [
		srcDir + "/_main.scss",
		srcDir + "/**/!(_main|_variables|*-theme)*.scss",
	],
	themes: srcDir + "/**/*-theme.scss",
	templates: srcDir + "/**/*.hbs",
	pages: srcDir + "/**/*-page.hbs",
	layouts: srcDir + "/**/*-layout.hbs",
	helpers: [
		srcDir + "/**/*-helper.js",
		rootDir + '/node_modules/handlebars-layouts/index.js',
	],
	assets: srcDir + "/_assets/**/*"
};


module.exports = config;
