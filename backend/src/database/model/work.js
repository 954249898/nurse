let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let time = new Date()
let work_schema = new Schema({
    workName: {type: String, default: '',required:true},//姓名
    plan: {type: String, default: '',required:true},//手机号
    time:{type: Date, default: null},//执行时间
    startTime:{type:Date,default:time},//开始时间
    endTime:{type:Date,default:null},//结束时间
    registrant:{type:String,default:''},//登记人
    memo:{type:String,default:''},//预约备注

})

module.exports = work_schema