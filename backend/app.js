let express = require('express')
let app = express()
let handleerror = require('http-errors')
var logger = require('morgan');
var indexrouter = require('./router/index');

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("access-control-allow-origin", "*");
    //允许的header类型
    res.header("access-control-allow-headers", "content-type");
    //跨域允许的请求方式
    res.header("access-control-allow-methods", "delete,put,post,get,options");
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api', indexrouter)

app.use(function (req, res, next) {
    next(handleerror(404, 'not found!'))
})
app.listen(3000, function () {
    console.log('serve is running:localhost:3000!')
})