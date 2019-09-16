/**
 * 后台首页
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    ctx.render('admin/index.html');
};

module.exports = {
    'GET /admin': index
};