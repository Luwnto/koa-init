
## 写在前面

![](https://img.shields.io/badge/node-%3E%3D8.1.0-green) ![](https://img.shields.io/badge/mysql-%3E%3D5.7.0-red) ![](https://img.shields.io/badge/npm-%3E%3D6.0.0-brightgreen)

找了很久没找到合适的开箱即用的Koa框架, 自己动手造了一个, 封装了很多实用的功能, 集成了Mysql的CURD, 完成了一个登陆和注册的功能, 欢迎使用

## 开始使用

### 安装

从Git仓库下载或克隆项目到本地:
```
$ git clone git@github.com:Luwnto/koa-init.git
```

进入到项目目录, 复制 `env.example.js` 到项目根目录, 名字改为 `env.js`:
```
$ cp env.example.js env.js
```

修改env.js, 将数据库配置改成你的:
```
$ vim env.js
```

安装依赖:
```
$ npm install
```

执行数据迁移, 完成表创建:
```
$ npm run migrate
```

运行项目:
```
$ npm run start
```

浏览器中访问项目:
```
http://127.0.0.1:3000
```

### 基本命令

如果你想更加方便的开发项目, 需要安装 `nodemon`:
```
sudo npm install -g nodemon
```

测试环境启动:
```
$ npm run start
```

生产环境启动, 同时开启守护进程:
```
$ npm run build
```

测试环境启动, 同时开启守护进程(推荐开发使用):
```
$ npm run dev
```

数据迁移(重新创建表):
```
$ npm run migrate
```

> 测试环境会显示报错信息, 生产环境会显示404页面, 生产环境还会生成页面缓存

### 数据库模型和数据迁移

数据库模型文件写在 `modules` 目录下, 使用ORM操作数据库的时候引入模型文件即可

数据库模型文件代码示例:
```
const db = require('../utils/db');

module.exports = db.defineModel('users', {
    username: { // 账号
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100), // 密码
    gender: db.BOOLEAN, // 性别
    avatar: db.STRING(100) // 头像
});
```

创建好数据库模型文件之后, 执行迁移命令即可完成表创建:
```
$ npm run migrate
```

> 注意迁移命令会清空所有表, 并重新创建, 生产环境禁用

### 路由

在项目启动的时候会自动扫描指定目录下的路由文件, 修改 `app.js` 的配置即可:
```
// 注册路由控制器
app.use(controller(['/controllers', '/controllers/home', '/controllers/admin']));
```

路由和业务代码默认放在 `controllers` 目录下, 代码示例如下:
```
var index = async (ctx, next) => {
    ctx.render('home/index.html');
};

var error = async (ctx, next) => {
    ctx.render('404.html');
};

module.exports = {
    'GET /': index,
    'GET /404': error,
};
```

### 模板渲染

使用 [Nunjucks](http://mozilla.github.io/nunjucks/) 模板引擎, 详细用户可以参考手册

for循环:
```
{% for t in test %}
    {{ t.name }}
{% endfor %}
```

if判断:
```
{% if test.name == 'li' %}
	  hello
{% else %}
	  world
{% endif %} 
```

### 全局变量

封装了部分变量到全局变量, 可以在模板引擎中直接使用:
```
<span>{{ session.user.name }}</span>
```

你可以使用这些全局变量:

* session session相关的数据
* body post请求相关的数据
* query get请求query查询相关的数据

你也可以在 `utils/templating.js` 文件中自行添加你需要的全局变量:
```
// 添加session到全局
env.addGlobal('session', ctx.session);
```

### 数据库增删改查

添加一条数据:
```
// 引入模型文件
const User = require('../../models/User');

// 插入数据库一条数据
var user = await User.create({
    username: username,
    password: crypto(password),
    gender: 1,
    avatar: '/public/img/avatar.png',
});
console.log(user);
```

查询一条数据:
```
// 引入模型文件
const User = require('../../models/User');

// 查询一条数据
var user = await User.find({
    where: {
        username: username
    }
});
console.log(user);
```

查询多条数据:
```
// 引入模型文件
const User = require('../../models/User');

// 查询一条数据
var users = await User.findAll({
    where: {
        username: username
    }
});
console.log(users);
```

更新一条数据:
```
// 引入模型文件
const User = require('../../models/User');

// 更新数据, 第一个参数是要更新的数据, 第二个参数是查询条件
var user = await User.update({
    gender: 0,
}, {'where': {username: 'admin'}});
console.log(user);
```

删除一条数据:
```
// 引入模型文件
const User = require('../../models/User');

// 删除数据, 参数是查询条件
var user = await User.destroy({'where': {username: 'admin'}});
console.log(user);
```

## 参考资料

[廖旭锋JavaScript教程](https://www.liaoxuefeng.com/wiki/1022910821149312)

[Nunjucks文档](https://nunjucks.bootcss.com/)

[Sequelize文档](https://sequelize.org/master/)

## LICENSE

[MIT](https://github.com/Luwnto/koa-init/blob/master/LICENSE)

