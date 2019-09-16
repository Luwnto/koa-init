const User = require('../../models/User');
/**
 * 用户个人中心
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var index = async (ctx, next) => {
    var user_id = ctx.params.user_id;
    var user = await User.find({
        where: {
            id: user_id
        }
    });

    ctx.render('home/user_info.html', {
        user: user
    });
};

module.exports = {
    'GET /user/:user_id': index
};