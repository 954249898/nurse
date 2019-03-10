let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let user_schema = new Schema({
    name: {type: String, default: '',required:true},//姓名
    password: {type: String, default: '123456',required:true},//密码
    phone: {type: String, default: '',required:true},//手机号
    head: {type: String, default: 'http://cdn.duitang.com/uploads/item/201411/09/20141109222431_58P5J.thumb.700_0.png',required:true},//头像
    role:{type:Number,default:2,required:true},//用户角色1-管理员、2-服务人员、3-顾客
    memo:{type:String,default:''},//预约备注
})

module.exports = user_schema