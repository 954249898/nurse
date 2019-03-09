let express = require('express')
let app = express()
let handleError = require('http-errors')
var logger = require('morgan');
var indexRouter = require('./router/index');



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