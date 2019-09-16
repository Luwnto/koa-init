/**
 * 轮播图列表页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    ctx.render('admin/advertisement.html');
};

/**
 * 轮播图添加页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var create = async (ctx, next) => {
    ctx.render('admin/advertisement_create.html');
};

module.exports = {
    'GET /admin/slide': index,
    'GET /admin/slide/create': create
};