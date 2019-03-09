let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let train_schema = new Schema({
    trainName: {type: String, default: '',required:true},//培训名称
    type: {type: String, default: ''},//手机号
    location: {type: String, default: ''},//手机号
    time:{type: String, default: ''},//执行时间
    startTime:{type:String,default:''},//开始时间
    endTime:{type:String,default:''},//结束时间
    trainer:{type:String,default:''},//培训人
    unit:{type:String,default:''},//培训所在单位
    number:{type:String,default:''},//培训人数
    memo:{type:String,default:''},//预约备注
})

module.exports = train_schema