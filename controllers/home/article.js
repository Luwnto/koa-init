/**
 * 文章首页
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    ctx.render('home/article.html');
};

/**
 * 写文章的页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var create = async (ctx, next) => {
    ctx.render('home/article_create.html');
};

module.exports = {
    'GET /article': index,
    'GET /article/create': create,
};