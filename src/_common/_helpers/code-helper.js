module.exports.register = function (handlebars) {
	handlebars.registerHelper('code', function(options) {

		var className = options.hash.lang || "";

		// 输入 html
		var input = options.fn(this);

		// 将HTML转换为字符串
		input = handlebars.Utils.escapeExpression(input);

		// 断线
		var lines = input.split("\n");

		// 在第一行之前获取标签数
		var numTabs = getNumFrontTabs(lines[0]);

		// 删除前面的制表符 
		lines = lines.map(function(line) {
			return line.substring(numTabs);
		});

		// 重新加入行
		return "<pre><code class='" + className + "'>" + lines.join("\n") + "</code></pre>";
	});
};


function getNumFrontTabs(line) {
	var count = 0;
	var index = 0;
	while (line.charAt(index++) === "\t") {
		count++;
	}
	return count;
}