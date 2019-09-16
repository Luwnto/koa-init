/**
 * 首页
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    ctx.render('home/index.html');
};

/**
 * 404页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var error = async (ctx, next) => {
    ctx.render('404.html');
};

module.exports = {
    'GET /': index,
    'GET /404': error,
};