let express = require('express')
let app = express()
let handleError = require('http-errors')

app.use(function (req,res,next) {
    next(handleError(404,'Not Found!'))
})
app.listen(3000,function () {
    console.log('Serve is running!')
})