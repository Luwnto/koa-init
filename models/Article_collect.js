const db = require('../utils/db');

module.exports = db.defineModel('article_collects', {
    user_id: db.INTEGER(10), // 哪个用户收藏的
    article_id: db.INTEGER(10), // 收藏的那个文章
}, {
    indexes: [
        {
            name: 'user_id',
            method: 'BTREE',
            fields: ['user_id']
        },
        {
            name: 'article_id',
            method: 'BTREE',
            fields: ['article_id']
        }
    ]
});