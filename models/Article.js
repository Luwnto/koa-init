const db = require('../utils/db');

module.exports = db.defineModel('articles', {
    user_id: {
        type: db.INTEGER(10),
    }, // 所属用户
    title: db.STRING(200), // 标题
    img: db.STRING(200), // 封面图
    content: db.TEXT, // 正文内容
    view_num: { // 浏览次数
        type: db.INTEGER(10),
        defaultValue: 0,
    },
    collect_num: { // 收藏次数
        type: db.INTEGER(10),
        defaultValue: 0,
    },
    isShow: {   // 是否显示  0 不显示, 1是显示
        type: db.BOOLEAN,
        defaultValue: 1
    },
}, {
    indexes: [
        {
            name: 'user_id',
            method: 'BTREE',
            fields: ['user_id']
        }
    ]
});