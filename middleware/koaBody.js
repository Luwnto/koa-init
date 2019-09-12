const path = require('path');
// 引入处理body参数的模块
const koaBody = require('koa-body');

module.exports = koaBody({
    multipart:true, // 支持文件上传
    // encoding:'gzip', // 启用这个, POST请求会报错
    formidable:{
        uploadDir:path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
        onFileBegin:(name,file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
    }
});