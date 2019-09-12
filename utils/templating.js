const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating() {
    var isProduction = process.env.NODE_ENV === 'production';

    // 创建Nunjucks的env对象:
    var env = createEnv('views', {
        noCache: !isProduction,
        watch: !isProduction
    });
    return async (ctx, next) => {
        // 添加session到全局
        env.addGlobal('session', ctx.session);
        // 添加POST请求参数到全局
        env.addGlobal('body', ctx.request.body);
        // 添加query请求参数到全局
        env.addGlobal('query', ctx.query);
        // // 添加params请求参数到全局
        // env.addGlobal('params', ctx.params);

        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };

        // 给ctx绑定文本输出
        ctx.error = function (content) {
            ctx.response.body = '<textarea readonly style="resize:none;outline: none;line-height:28px;color: red; margin: 0px;width: 100%;height: 100%;font-size: 18px;border: 0;padding: 20px;">' +
                '出错啦! 错误信息如下:\n\n' +
                content +
                '</textarea>';
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };

        // 继续处理请求:
        await next();
    };
}

module.exports = templating;