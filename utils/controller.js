const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dirs) {
    // 循环所有目录
    dirs.map((d) => {
        var files = fs.readdirSync(__dirname + '/..' + d);
        var js_files = files.filter((f) => {
            return f.endsWith('.js');
        });

        for (var f of js_files) {
            console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + '/..' + d + '/' + f);
            addMapping(router, mapping);
        }
    });
}

module.exports = function (dirs) {
    let router = require('koa-router')();
    addControllers(router, dirs);
    return router.routes();
};

