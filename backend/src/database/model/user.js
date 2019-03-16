let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let user_schema = new Schema({
    name: {type: String, default: '',required:true},//姓名
    password: {type: String, default: '123456',required:true},//密码
    phone: {type: String, default: '',required:true},//手机号
    head: {type: String, default: 'http://cdn.duitang.com/uploads/item/201411/09/20141109222431_58P5J.thumb.700_0.png',required:true},//头像
    role:{type:Number,default:2,required:true},//用户角色1-管理员、2-服务人员、3-顾客
    sex: {type: String, default: ''},//性别
    orderNumber:{type: Number, default: 0},//订单数
    salary:{type:Number,default:0},//月薪
    age:{type:Number},//年龄
    address:{type:String},//家庭地址
    memo:{type:String},//备注
})

module.exports = user_schema