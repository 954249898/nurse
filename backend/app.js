let express = require('express')
let app = express()
let handleerror = require('http-errors')
var logger = require('morgan');
var indexrouter = require('./router/index');

//设置跨域访问 TODO:
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }else {
        next();
    }
});

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