/**
 * 轮播图列表页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    ctx.render('admin/slide.html');
};

/**
 * 轮播图添加页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var create = async (ctx, next) => {
    ctx.render('admin/slide_create.html');
};

var save = async (ctx, next) => {
    // 上传后的文件目录和名字
    console.log(ctx.uploadpath);
};

module.exports = {
    'GET /admin/slide': index,
    'GET /admin/slide/create': create,
    'POST /admin/slide/save': save,
};