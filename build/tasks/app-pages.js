var path 	= require('path');
var glob 	= require('glob');
var fs 		= require('fs-extra');
var through = require('through2');
var File = require('vinyl');
var StringDecoder = require('string_decoder').StringDecoder;
var extend 	= require('util')._extend;
var dotenv = require('dotenv');

var frontMatter = require('front-matter');
var handlebars = require('handlebars');
var handlebarsRegistrar = require('handlebars-registrar');

var config 	= require('../../config');
var partials = {};

module.exports.task = function(gulp, plugins, paths) {


	// 注册handlebars引擎助手和部件
	handlebarsRegistrar(handlebars, {
		helpers: paths.app.helpers,
		partials: paths.app.templates,
		parsePartialName: function (partial) {

			// Save in partials vinyl registry
			partials[partial.shortPath] = new File({
				cwd: partial.cwd,
				path: partial.path,
				base: path.basename(partial.path),
				contents: fs.readFileSync(partial.path)
			});

			return partial.shortPath;
		},
		bustCache: true,
	});


	gulp.src(paths.app.pages)
		// 渲染页面
		.pipe(through.obj(function (file, enc, cb) {
			file.contents = new Buffer(renderTemplate(file));

			this.push(file);
			cb();
		}))
		// 处理错误
		.on('error', plugins.util.log)

		// 重命名 .page.hbs 为 .html
		.pipe(plugins.rename(function (path) {
			path.basename = path.basename.replace("-page", "");
			path.extname = ".html"
		}))

		// 扁平化结构 Flatten structure
		.pipe(plugins.flatten())

		// 预定义HTML结构 pretify html structure
		.pipe(plugins.prettify({
			indent_size: 4
		}))

		// 输出
		.pipe(gulp.dest(config.destDir))

		// 现场重载 Live-Reload
		.pipe(plugins.connect.reload());

};


/********************************************
*				实用工具
*********************************************/

function renderTemplate(file, options) {

	options = options || {};

	// 设置文件前事项 Set file frontMatter
	file = setFrontMatter(file);

	// Get context from _context.js files and frontmatter
	var contextExternal = getPageContextExternal(file);

	// Frontmatter context
	var contextTemplate = file.frontMatter || {};

	// Inherited context from child
	var contextInherited = options.contextInherited || {};

	// Result context
	var	context = extend({}, 	  contextExternal);
		context = extend(context, contextTemplate);
		context = extend(context, contextInherited);

	// 页面渲染结果
	var pageRes = "";

	// 编译模板
	var template = handlebars.compile(String(file.contents));
	var templateRes = template(context);

	// 布局处理
	var layout = context.layout || null;

	// 如果布局存在，则使用内部模板渲染
	if (layout && partials[layout] && handlebars.partials[layout]) {

		// New instance of context
		var layoutData = extend({}, context);

		// Add body to context
		layoutData = extend(layoutData, {
			body: templateRes
		});

		// Remove layout parameter from inhereted context
		delete layoutData.layout;

		// New vinyl file based on partail vinyl
		var layoutFile = new File(partials[layout]);

		// Call recursively render template again
		pageRes = renderTemplate(layoutFile, {
			contextInherited: layoutData
		});
	}
	// Return rendered template
	else {
		pageRes = templateRes;
	}

	return pageRes;
}


/*
	Frontmatter file
*/
function setFrontMatter(file) {
	// Read content from front matter
	var content = frontMatter(file.contents.toString('utf8'));

	// var res = new Buffer(content.body);
	file.contents = new Buffer(content.body);
	file.frontMatter = content.attributes;

	return file;
}


/*
    此函数返回当前页的上下文
    它是根上下文，由所有上下文扩展到
	当前级别上下文
	也可以在根文件夹中使用.env文件

	This function returns context of current page
	which is root context extended by all contexts untill
	current level context
	You may also use .env file in root folder
*/


function getPageContextExternal(file) {

	// 初始化上下文
	var context = {};

	// 环境变量
	env = dotenv.config({
		path: path.resolve(config.rootDir, '.env')
	}) || {};

	env.parsed = env.parsed || {};

	//
	extend(context, env.parsed);
	extend(context, process.env)

	context.BASE_URL = context.BASE_URL || '/';

	// 包数据
	context.pkg = require('../../package.json');

	var rootDir = path.resolve(config.srcDir);
	var pageDir = path.dirname(file.path);

	var contextPaths = [];

	// 开始从页面目录直到根目录
	for (var activeDir = pageDir; activeDir.length >= rootDir.length; activeDir = path.resolve(activeDir, '../') ) {
		contextPaths.push(
			path.resolve(activeDir, '_context.js')
		);
	}

	// 反向上下文，因此迭代将从根级上下文开始
	contextPaths.reverse();


	contextPaths.map(function(filePath) {
		if (!fs.pathExistsSync(filePath)) {
			return false;
		}

		var localContext = require(filePath);

		extend(context, localContext);
	});


	return context;
};
