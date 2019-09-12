const User = require('../../models/User');
const crypto = require('../../utils/crypto');

/**
 * 打开登录页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var loginPage = async (ctx, next) => {
    ctx.render('home/login.html');
};

/**
 * 执行登录操作
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var loginPost = async (ctx, next) => {
    // 获取表单提交的参数
    var username = ctx.request.body.username;
    var password = ctx.request.body.password;

    // 所有字段都不能为空
    if (!username || !password) {
        ctx.render('home/login.html', {
            e_username: !username ? '账号不能为空' : '',
            e_password: !password ? '密码不能为空' : '',
        });
        return;
    }

    // 通过用户名查询数据, 获取用户数据
    var check_user = await User.find({
        where: {
            username: username
        }
    });

    // 如果用户不存在, 提示用户
    if (!check_user) {
        ctx.render('home/login.html', {e_username: '账号不存在, 请重新输入, 或注册'});
        return;
    }

    // 对比密码是否正确
    if (crypto(password) != check_user.password) {
        ctx.render('home/login.html', {e_password: '密码错误, 请重新输入'});
    } else {
        // 将用户信息写入session
        ctx.session.user = check_user.dataValues;
        // 重定向到首页
        ctx.redirect('/');
    }
};

/**
 * 打开注册页面
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var registerPage = async (ctx, next) => {
    ctx.render('home/register.html');
};

/**
 * 执行注册操作
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var registerPost = async (ctx, next) => {
    // 获取表单提交的参数
    var username = ctx.request.body.username;
    var password = ctx.request.body.password;
    var password_confirm = ctx.request.body.password_confirm;

    // 所有字段都不能为空
    if (!username || !password || !password_confirm) {
        ctx.render('home/register.html', {
            e_username: !username ? '账号不能为空' : '',
            e_password: !password ? '密码不能为空' : '',
            e_confirm: !password_confirm ? '确认密码不能为空' : '',
        });
        return;
    }

    // 密码长度不够6位, 不能注册
    if (password.length < 6) {
        ctx.render('home/register.html', {e_password: '密码长度至少6位'});
        return;
    }

    // 两次密码输入不一致, 不能注册
    if (password != password_confirm) {
        ctx.render('home/register.html', {e_confirm: '两次密码输入布不一致, 请重新输入'});
        return;
    }

    // 通过用户名查询数据, 获取用户数据
    var check_user = await User.find({
        where: {
            username: username
        }
    });

    // 如果用户已经存在, 不让注册
    if (check_user) {
        ctx.render('home/register.html', {e_username: '账号已存在, 请重新输入'});
        return;
    }

    // 验证通过之后, 插入数据库
    var user = await User.create({
        username: username,
        password: crypto(password),
        gender: 1,
        avatar: '/public/img/avatar.png',
    });

    // 判断是否创建成功
    if (user) {
        // 把用户信息加入session
        ctx.session.user = user.dataValues;
        // 重定向到首页
        ctx.redirect('/');
    }
};

/**
 * 用户退出
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
var loginOut = async (ctx, next) => {
    // 销毁session
    ctx.session.user = null;
    // 重定向到首页
    ctx.redirect('/');
};

module.exports = {
    'GET /login/page': loginPage,
    'POST /login/post': loginPost,
    'GET /register/page': registerPage,
    'POST /register/post': registerPost,
    'GET /login/out': loginOut
};