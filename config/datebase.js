const env = require('../env');

var datebase = {
    mysql: {
        dialect: env.mysql_dialect, // 使用的驱动
        database: env.mysql_database, // 使用的数据库
        username: env.mysql_username, // 用户名
        password: env.mysql_password, // 密码
        host: env.mysql_host, // 数据库地址
        port: env.mysql_port // 端口奥
    }
};

module.exports = datebase;