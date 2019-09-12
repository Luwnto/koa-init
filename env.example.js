var env = {
    // 项目相关配置
    app_key: 'koa-init',
    domain: "www.example.com",

    // 数据库相关配置
    mysql_dialect: 'mysql',
    mysql_database: 'nodejs',
    mysql_username: 'root',
    mysql_password: 'root',
    mysql_host: '127.0.0.1',
    mysql_port: 3306,

    // session 相关配置
    session_maxAge: 86400000,
};

module.exports = env;