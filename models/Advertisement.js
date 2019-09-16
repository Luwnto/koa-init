const db = require('../utils/db');

module.exports = db.defineModel('advertisements', {
    title: db.STRING(200), // 标题
    info: db.STRING(256), // 介绍
    remark: db.STRING(200), // 备注
    seq: db.INTEGER(10), // 序号
    isShow: {   // 是否显示  0 不显示, 1是显示
        type: db.BOOLEAN,
        defaultValue: 1
    },
});