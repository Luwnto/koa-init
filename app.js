// 引入koa模块
const Koa = require('koa');

// 实例化koa对象
const app = new Koa();

// 注册日志中间件
const logsMiddleware = require('./middleware/log');
app.use(logsMiddleware);
const logger = require('koa-logger');
app.use(logger());

// // 引入session模块
const session = require('koa-session');
// 引入session中间件
const sessionMiddleware = require('./middleware/session');
const sessionConfig = require('./config/session');
app.keys = [sessionConfig.key];
const CONFIG = sessionConfig.config;
app.use(session(CONFIG, app));
app.use(sessionMiddleware);

// 处理静态文件
const static_ = require('koa-static');
app.use(static_('./'));

// 解析POST请求, 并设置文件上传
const koaBody = require('./middleware/koaBody');
app.use(koaBody(app));

// 引入页面模板渲染工具
const templating = require('./utils/templating');
// 封装视图渲染render
app.use(templating());

// 引入路由文件
const controller = require('./utils/controller');
// 注册路由控制器
app.use(controller(['/controllers', '/controllers/home', '/controllers/admin']));

// 开启web服务并监听3000端口
app.listen(3000);

console.log('app started at port 3000...');