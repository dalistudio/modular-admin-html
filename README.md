# ModularAdmin: Free Bootstrap 4 Dashboard Theme <br> HTML version

[![演示](http://modularcode.github.io/modular-admin-html/assets/demo.png)](http://modularcode.github.io/modular-admin-html/)

<p align="center">
  <strong>
    <a href="http://modularcode.github.io/modular-admin-html/" target="_blank">演示</a> | <a href="https://github.com/modularcode/modular-admin-html/releases" target="_blank">下载 ZIP</a>
  </strong>
</p>

**[ModularAdmin](http://modularcode.github.io/modular-admin-html/)** 是一个开源的 **仪表盘主题** 以模块化的方式构建。 这使得它易于扩展、修改和维护。This project is proudly supported by <a href="https://screenful.com/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">Agile Metrics by Screenful</a> (*instant visual <a href="https://screenful.com/dashboard-for-trello/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">dashboards for Trello</a> | <a href="https://screenful.com/dashboard-for-jira/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">Jira</a> | <a href="https://screenful.com/dashboard-for-asana/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">Asana</a> | <a href="https://screenful.com/dashboard-for-pivotal-tracker/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">Pivotal Tracker</a> | <a href="https://screenful.com/dashboard-for-github/?utm_source=modularadmin&utm_campaign=modularadmin" target="_blank">Github</a>*)


#### Heads up for the ModularAdmin v2!
我们正在努力编写版本2，这是一个完整的重写。
<a href="https://modular-admin-html.modularcode.io/" target="_blank">V2 演示</a> | <a href="https://github.com/dalistudio/modular-admin-html/tree/v2-dev" >V2 代码</a> <br>
**请考虑 [支持我们](#support-us) 让这一切发生！**

---


## 入门

> **注意:** 如果您不想重新构建项目，您可以直接克隆这个分支。  ```https://github.com/dalistudio/modular-admin-html/tree/gh-pages```

### 1. [下载 ZIP](https://github.com/dalistudio/modular-admin-html/releases/latest) 或者 Git 克隆

```
git clone https://github.com/dalistudio/modular-admin-html.git
```
### 2. 编译生成项目

克隆/下载的存储库不包含项目的预构建版本，您需要构建它。 你需要 [NodeJs](https://nodejs.org/en/) (v4+) 已安装 npm (v2.15+)


安装 npm 依赖关系（ubuntu中，windows不能通过编译） 
```
npm install
```

编译生成项目和启动一个本地web服务器
```
npm start
```

浏览器访问 [http://localhost:4000](http://localhost:4000).


**警告!** 在 ```dist/``` 文件夹中所做的所有更改都将在应用程序生成时覆盖。

<br>

你还可以 <strong>[在 docker 中运行项目](#running-in-docker)</strong> 感谢 @japrogramer

<br>

## 目录结构

```
├── build/               # app 生成任务和工具
├── config/              # 生成配置文件和路径定义
├── dist/                # 生成编译结果
├── node_modules/        # nodejs 依赖文件        
├── src/                 # 源代码文件
└── package.json         # npm 配置文件
```

#### ```config/``` 目录

此文件夹包含应用程序生成配置和路径定义。
对于 **添加/移除 NPM 依赖关系** 你需要在模块安装后 **手动定义路径** 在 `config/index.js` 文件。

#### ```build/``` 目录

此文件夹包含与应用程序编译相关的文件。 这可以是样式预处理（LESS、SASS、PostSS）和模板引擎编译、脚本文件连接和缩小以及其他相关任务。

```
├── tasks/                           # 任务目录
|   └── {different tasks}            # 每个文件表示一个生成任务
├── utils/                           # 一些实用工具
└── gulpfile.js                      # gulp生成文件

```


#### ```src/``` 目录

此文件夹包含我们的应用程序源文件。
文件夹结构反映应用程序组件结构。


每个非下划线文件夹表示一个组件模块。模块可以相互嵌套。

还有一些以下划线开头的特殊文件夹。
例如： ```_common/``` 目录包含由同一级别的其他组件使用的公共组件。

这种文件结构使我们的应用程序文件组织非常语义化和可扩展性。此外，即使您正在开发大型应用程序，也很容易在单独的组件上工作。

```
├── _assets/                           # 应用程序资产
├── _common/                           # 通用组件
|   ├── helpers/                       # handlebars 助手
|   └── styles/                        # 通用样式表
├── _themes/                           # 不同的主题版本
├── app/                               # app 模块 (仪表盘视图)
│   ├── _common/                       # app 通用组件
│   |   ├── editor/                    # wysiwyg 编辑器文件
│   |   ├── footer/                    # 页脚文件
│   |   ├── header/                    # 页眉文件
│   |   ├── modals/                    # 通用模式对话框 (确认, 图像库, 等)
│   |   └── sidebar/                   # 侧边栏文件
│   ├── {different modules}
│   ├── app-layout.hbs                 # app 视图布局
│   └── app.scss                       # app 主视图样式表
├── auth/                              # 辅助模块 (登录/注册/找回)
│   ├── {different modules}
│   ├── auth-layout.hbs                # 辅助视图布局
│   └── auth.scss                      # 辅助视图样式表
├── _context.js                        # main handlebars variables
├── _main.scss                         # 主样式表
├── _variables.scss                    # 表量表
├── config.js                          # javascript 配置文件
└── main.js                            # 主脚本文件

```



#### ```dist/``` 目录

我们应用程序的编译状态，包括已处理的样式、模板、脚本和资产。

**警告！永远不要在此文件夹中工作，因为每次生成时都将覆盖您的更改。**

<br>

## 文件类型

我们的应用程序由不同的文件类型组成。

#### 样式表 (*.scss)

我们使用 [SASS](http://sass-lang.com/) CSS 预处理语言. 
主要变量定义在 ```src/_variables.scss``` 目录. 
为了让生活更轻松，我们将样式分解为组件，在构建时，我们只是将所有的 ```.scss``` 文件合并在一起，并将其处理为 ```dist/css/app.css``` 文件。样式文件按以下顺序合并

```
{variables.scss}
{bootstrap variables}
{bootstrap mixins}
{rest style files}
```
其余的样式文件按字母顺序合并。

在 ```src/_themes/ folder```中还有不同的主题变体, 您可以在其中更改主变量以获得不同的主题。有一些内置的预定义主题。您可以通过在 ```src/_themes/``` 文件夹中添加新文件来添加新主题。文件名必须以 ```-theme.scss``` 结尾。

#### 脚本 (*.js)

我们在应用程序的各个组件之间分离应用程序的脚本。为了简单起见，我们在这个版本中使用ES5，并将每个组件的脚本包装在 jQuery ```$(function() { })```中。 JS配置在 ```src/config.js``` 文件中定义。在构建时，应用程序脚本文件合并在一起并复制到 ```dist/js/app.js``` 文件夹。脚本文件按以下顺序合并。

```
{config.js}
{all .js files except main.js}
{main.js}
```

#### 模板 (*.hbs)

模板是用模板引擎语言编写的HTML文件。我们使用 [Handlebars](http://handlebarsjs.com/), 它允许在HTML中有条件，在不同的页面中重用部分（如侧栏、页脚），使用循环、布局等。

#### 页面 (*-page.hbs)

模板本身只是标记的一部分，不编译为单独的文件。在最终输出中，我们真正想要的是 ```dist/``` 文件夹中的 ```.html``` 页。 它有一些特殊的handlebars模板，它们的文件名以``-page.hbs``结尾。 每个 ```{pagename}-page.hbs``` 文件都将编译为 ```dist/{pagename}.html``` 页面具有扁平文件结构。

页面可以由不同的模板（部分）组成，这些模板（部分）可以包含在handlebars部分包括功能中。另外，每个页面都有其上下文，这是在呈现时传递到模板中的数据。该数据用于模板表达式和变量。页面上下文可以用两种方式定义：

**YAML** headers ([例子](https://github.com/dalistudio/modular-admin-html/blob/master/src/app/dashboard/index-page.hbs))

```
---
foo: bar
list: 
  - One
  - Two
  - Three
---
```
and **_context.js** files.
```
module.exports = {
  foo: 'bar',
  foo2: function() {
    // do some magic, return some string
  },
  list: [
    'One', 'Two', 'Three'
  ]
}
```

页面上下文的最终结果是两种方法的组合。此外，不同深度级别的context.js文件相互扩展，然后使用 YAML 头数据进行扩展。为了简单起见，我们只使用**YAML**头。

#### 布局 (*-layout.hbs)

如果不同的页面有许多常见的组件，如侧栏、页眉、页脚，那么最好为这些常见页面定义一个布局，并且只在页面文件中定义唯一的内容。

布局是一个页面内容包装器。如果页面在输出中有布局，我们将把页面的内容插入到布局中。布局应具有```{{{body}}}``` 手把标记，这是页面内容的入口点。 ([例子](https://github.com/dalistudio/modular-admin-html/blob/master/src/app/app-layout.hbs))

要定义页面布局，需要指定页面文件上下文的 ```layout``` 变量。 它既可以使用 YAML 头文件，也可以使用 context.js 文件。 ([例子](https://github.com/dalistudio/modular-admin-html/blob/master/src/app/forms/forms-page.hbs)).

布局也可以有上下文和父布局。

```
{_main-layout.hbs}                  # 带有doctype、head、scripts声明的主布局
    {app/app-layout.hbs}            # 带侧边栏、页眉和页脚的仪表板布局
        {app/forms/forms-page.hbs}  # 任何仪表板页
```

如果您需要多个内容块同时进行更高级的布局，您可以使用 [handlebar layouts](https://www.npmjs.com/package/handlebars-layouts)helper方法，这也是现成的。

<br>

## 在 Docker 中运行

你可以在Docker中运行这个项目。要构建容器，需要安装docker和docker compose，然后启动docker守护进程。启动守护程序后，从项目文件夹中运行以下命令：

生成镜像
```
docker-compose build
```

启动容器
```
docker-compose up
```


## 支持我们！

### 贡献

加入我们的团队！随时打开新的 issues/pull。

### 取得联系

你可以在聊天室和我们联系
如果您有任何问题、建议、评论和潜在功能请求，请随时联系我们。

* Dali Wang | wangdali[at]qq.com




### 支持者

支持我们每月捐赠，帮助我们继续我们的活动。 [[成为支持者](http://dalistudio.net)]



## 赞助商

成为一个赞助商，在GitHub的自述文件中找到你的标志，并链接到你的网站。 [[成为赞助商](http://dalistudio.net)]




