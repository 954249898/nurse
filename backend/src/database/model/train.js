let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let time = new Date()
let train_schema = new Schema({
    trainName: {type: String, default: '',required:true},//培训名称
    type: {type: String, default: ''},//类型
    address: {type: String, default: ''},//地点
    time:{type: Date, default: null},//执行时间
    startTime:{type:Date,default:time},//开始时间
    endTime:{type:Date,default:null},//结束时间
    trainer:{type:String,default:''},//培训人
    unit:{type:String,default:''},//培训所在单位
    number:{type:String,default:''},//培训人数
    content:{type:String,default:''},//培训内容
    memo:{type:String,default:''},//预约备注
})

module.exports = train_schema