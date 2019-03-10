let express = require('express')
let app = express()
let handleError = require('http-errors')
var logger = require('morgan');
var indexRouter = require('./router/index');

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api',indexRouter)

app.use(function (req,res,next) {
    next(handleError(404,'Not Found!'))
})
app.listen(3000,function () {
    console.log('Serve is running:localhost:3000!')
})