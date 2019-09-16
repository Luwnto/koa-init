const path = require('path');
const fs = require('fs');
// 引入处理body参数的模块
const koaBody = require('koa-body');

/**
 * 检查目录是否存在
 *
 * @param p
 */
function checkDirExist(p) {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
}

/**
 * 获取文件后缀
 *
 * @param name
 * @returns {string}
 */
function getUploadFileExt(name) {
    let ext = name.split('.');
    return ext[ext.length - 1];
}

/**
 * 生文件名字
 *
 * @param ext
 * @returns {*}
 */
function getUploadFileName(ext) {
    return Date.now() + Number.parseInt(Math.random() * 10000) + '.' + ext;
}

module.exports = function (app) {
    return koaBody({
        multipart:true, // 支持文件上传
        // encoding:'gzip', // 启用这个, POST请求会报错
        formidable:{
            uploadDir:path.join(__dirname, '../public/upload/'), // 设置文件上传目录
            keepExtensions: true,    // 保持文件的后缀
            maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
            onFileBegin:(name,file) => { // 文件上传前的设置
                // console.log(`name: ${name}`);
                // console.log(file);

                // 获取文件后缀
                const ext =getUploadFileExt(file.name);
                // 最终要保存到的文件夹目录
                const dir = path.join(__dirname, '../public/upload/');
                // 检查文件夹是否存在如果不存在则新建文件夹
                checkDirExist(dir);

                const fileName = getUploadFileName(ext);
                file.path = dir + fileName;
                app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
                app.context.uploadpath[name] = 'public/upload/' + fileName;
            },
        }
    });
};