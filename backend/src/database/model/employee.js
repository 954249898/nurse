let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let employee_schema = new Schema({
    name: {type: String, default: '',required:true},//姓名
    sex: {type: String, default: ''},//性别
    orderNumber:{type: String, default: ''},//订单数
    phone:{type:String,default:''},//手机号
    salary:{type:Number,default:0},//月薪
    age:{type:Number},//年龄
    address:{type:Number},//家庭地址
    memo:{type:Number},//备注
})

module.exports = employee_schema