
module.exports = async (ctx, next) => {
    var path = ctx.path;

    // 不需要session, 可直接进入的路由
    var notLogin = ['/', '/login/page', '/login/post', '/login/out', '/register/page', '/register/post', '/404'];
    // 已有session, 禁止再次进入的路由
    var notBySession = ['/login/page', '/login/post', '/register/page', '/register/post'];

    if (!(notLogin.includes(path) || path.includes('/public/')) && !ctx.session.user) {
        // 重定向到登录页
        ctx.redirect('/login/page');
    } else if (notBySession.includes(path) && ctx.session.user) {
        // 重定向到首页
        ctx.redirect('/');
    } else {
        await next();
    }
};