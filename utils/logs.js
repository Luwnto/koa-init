var log4js = require('log4js');
var logsConfig = require('../config/logs.js');
//加载配置文件
log4js.configure(logsConfig);
//调用预先定义的日志名称
var resLogger = log4js.getLogger("resLogger");
var errorLogger = log4js.getLogger("errorLogger");
var handleLogger = log4js.getLogger("handleLogger");
var consoleLogger = log4js.getLogger();

// 格式化日志文本 加上日志头尾和换行方便查看 ==>  普通日志、请求日志、响应日志、操作日志、错误日志
var formatText = {
    info: function(info) {
        var logText = new String();
        //响应日志头信息
        // logText += "\n" + "***************info log start ***************" + "\n";
        //响应内容
        logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";
        //响应日志结束信息
        // logText += "*************** info log end ***************" + "\n";
        return logText;
    },
    request: function(req, resTime) {
        var logText = new String();
        var method = req.method;
        //访问方法
        logText += "request method: " + method + "\n";
        //请求原始地址
        logText += "request originalUrl:  " + req.originalUrl + "\n";
        //客户端ip
        logText += "request client ip:  " + req.ip + "\n";
        //开始时间
        // var startTime;
        //请求参数
        // if (method === 'GET') {
        //     logText += "request query:  " + JSON.stringify(req.query) + "\n";
        //     // startTime = req.query.requestStartTime;
        // } else {
        //     logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        //     // startTime = req.body.requestStartTime;
        // }
        //服务器响应时间
        // logText += "response time: " + resTime + "\n";
        return logText;
    },
    response: function(ctx, resTime) {
        var logText = new String();
        //响应日志开始
        // logText += "\n" + "*************** response log start ***************" + "\n";
        //添加请求日志
        logText += formatText.request(ctx.request, resTime);
        //响应状态码
        logText += "response status: " + ctx.status + "\n";
        //响应内容
        // logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
        //响应日志结束
        // logText += "*************** response log end ***************" + "\n";
        return logText;
    },
    handle: function(info) {
        var logText = new String();
        //响应日志开始
        // logText += "\n" + "***************info log start ***************" + "\n";
        //响应内容
        logText += "handle info detail: " + "\n" + JSON.stringify(info).replace(/\\n/g, "\n") + "\n";
        //响应日志结束
        // logText += "*************** info log end ***************" + "\n";
        return logText;
    },
    error: function(ctx, err, resTime) {
        var logText = new String();
        //错误信息开始
        // logText += "\n" + "*************** error log start ***************" + "\n";
        //添加请求日志
        logText += formatText.request(ctx.request, resTime);
        //错误名称
        logText += "err name: " + err.name + "\n";
        //错误信息
        logText += "err message: " + err.message + "\n";
        //错误详情
        logText += "err stack: " + err.stack + "\n";
        //错误信息结束
        // logText += "*************** error log end ***************" + "\n";
        return logText;
    }
}

module.exports = {
    //封装普通日志
    logInfo: function(info) {
        if (info) {
            consoleLogger.info(formatText.info(info));
        }
    },
    //封装响应日志
    logResponse: function(ctx, resTime) {
        if (ctx) {
            resLogger.info(formatText.response(ctx, resTime));
        }
    },
    //封装操作日志
    logHandle: function(res) {
        if (res) {
            handleLogger.info(formatText.handle(res));
        }
    },
    //封装错误日志
    logError: function(ctx, error, resTime) {
        if (ctx && error) {
            errorLogger.error(formatText.error(ctx, error, resTime));
        }
    },
    // 封装文本显示
    errorString: function (ctx, error, resTime) {
        return formatText.error(ctx, error, resTime);
    }
};