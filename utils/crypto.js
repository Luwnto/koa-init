//导入模块
var crypto = require('crypto');

/**
 * sha256加密模块 (加密固定,不可逆)
 *
 * @param str string 要加密的字符串
 * @retrun string 加密后的字符串
 * */
module.exports = function(str) {
    var sha256 = crypto.createHash("sha256");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    sha256.update(str);
    return sha256.digest("hex");  //加密后的值d
};