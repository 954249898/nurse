let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let user_schema = new Schema({
    name: {type: String, default: '',required:true},//姓名
    phone: {type: String, default: '',required:true},//手机号
    memo:{type:String,default:''},//预约备注
})

module.exports = user_schema