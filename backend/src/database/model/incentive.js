let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let incentive_schema = new Schema({
    name: {type: String, default: '',required:true},
    date: {type: String, default: '',required:true},//奖惩开始日期
    type: {type: String, default: '',required:true},//奖惩类型
    money: {type: Number, default: 0},
    receiver: {type: String, default: ''},
    type:{type: String, default: ''},//类型
    reason:{type:String,default:''},//奖惩原因
    memo:{type:String},//备注
})

module.exports = incentive_schema