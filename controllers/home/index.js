var index = async (ctx, next) => {
    ctx.render('home/index.html');
};

var error = async (ctx, next) => {
    ctx.render('404.html');
};

module.exports = {
    'GET /': index,
    'GET /404': error,
};