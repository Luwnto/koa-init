const logsUtil = require('../utils/logs.js');

module.exports = async (ctx, next) => {
    const start = new Date();
    let intervals;
    try {
        await next();
        // intervals = new Date() - start;
        // logsUtil.logResponse(ctx, intervals);	  //记录响应日志
    } catch (error) {
        intervals = new Date() - start;
        logsUtil.logError(ctx, error, intervals);//记录异常日志
        var isProduction = process.env.NODE_ENV === 'production';
        if (isProduction) {
            // 如果是生产环境重定向到404
            ctx.redirect('/404');
        } else {
            // 如果是开发环境, 显示错误
            ctx.error(logsUtil.errorString(ctx, error, intervals));
        }
    }
};