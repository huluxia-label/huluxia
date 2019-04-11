var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/',proxy({
  target: 'http://floor.huluxia.com',
  changeOrigin: true
}));
app.use('/v1',proxy({
	target: 'http://tools.huluxia.com',
	changeOrigin: true
}))
app.listen(7000);
