const db = require('../utils/db');

module.exports = db.defineModel('users', {
    username: { // 账号
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100), // 密码
    gender: db.BOOLEAN, // 性别
    avatar: db.STRING(100) // 头像
});