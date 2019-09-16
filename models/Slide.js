const db = require('../utils/db');

module.exports = db.defineModel('slides', {
    title: db.STRING(200), // 标题
    remark: db.STRING(200), // 备注
    seq: db.INTEGER(10), // 序号
    isShow: {   // 是否显示  0 不显示, 1是显示
        type: db.BOOLEAN,
        defaultValue: 1
    },
});