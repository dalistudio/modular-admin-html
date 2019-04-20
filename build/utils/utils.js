var glob = require('glob');
var path = require('path');

function loadTasks(gulp, plugins, paths) {
	var taskNames = [];

	// 从“tasks”文件夹加载所有任务
	glob.sync(path.resolve(__dirname, '../tasks/*.js')).forEach(function(filePath) {
		var taskName = path.basename(filePath, '.js');
			taskNames.push(taskName);

		var task = require(filePath).task;
		var deps = require(filePath).deps || [];

		gulp.task(taskName, deps, function() {
			task(gulp, plugins, paths)
		});
	});


	return taskNames;
}


module.exports.loadTasks = loadTasks;