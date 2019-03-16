let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let time = new Date()
let order_schema = new Schema({
    name: {type: String, default: ''},//服务人员姓名
    customerNm: {type: String, default: ''},//顾客姓名
    status: {type: Number, default: 1},//状态
    phone: {type: String, default: ''},//护工手机号
    time:{type: Date, default: time},//预约时间
    item:{type:String,default:''},//预约项目
    address:{type:String,default:'上海市'},//预约地址
    memo:{type:String,default:''},//预约备注
})

module.exports = order_schema