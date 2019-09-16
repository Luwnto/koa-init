const db = require('../utils/db');

module.exports = db.defineModel('users', {
    username: { // 账号
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100), // 密码
    gender: { // 性别 1男 0女
        type: db.BOOLEAN,
        defaultValue: 1
    },
    isAdmin: { // 是否是管理员 0 不是, 1是
        type: db.BOOLEAN,
        defaultValue: 0
    },
    isLocked: {   // 是否锁定 0 不是, 1是锁定
        type: db.BOOLEAN,
        defaultValue: 0
    },
    avatar: db.STRING(100), // 头像
    signature: { // 签名
        type: db.STRING(200),
        defaultValue: ''
    }
});