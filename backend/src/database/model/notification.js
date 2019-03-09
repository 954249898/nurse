let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let notification_schema = new Schema({
    time: {type: String, default: '',required:true},//公告通知
    sender: {type: String, default: ''},//性别
    type:{type: String, default: ''},//类型
    content:{type:String,default:''},//手机号
    memo:{type:Number},//备注
})

module.exports = notification_schema