var mongoose = require('mongoose');
let config = require('../../config/config');
let url = config.dbHost;

/**
 * 连接
 */
mongoose.connect(url);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection successful:' + url)
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err)
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected')
});

module.exports = mongoose;