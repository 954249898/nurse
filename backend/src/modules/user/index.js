let db = require('../../database/db.js')
let user_schema = require('../../database/model/user')
let user_model =db.model('user',user_schema)


let queryGroup = function(req,res,next){
    user_model.find(function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        res.json({success:true,data:data})
        return
    })
}
let queryLib = function(req,res,next){
    let id = ''
    user_model.find(id,function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        res.json({success:true,data:data})
    })
}
let updateLib = function(req,res,next){
    let data = req.body
    user_model.findByIdAndUpdate(data._id,data,function (err,data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
let addLib = function(req,res,next){
    let data = req.body
    user_model.find({name:data.name},function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        console.log('===========================')
        console.log(data)
        if(data.length > 0){
            res.json({success:false,errMsg:'用户名已存在!'})
            return
        }
        user_model.create(data, function (err, result) {
            if (err) {
                res.json({success: false, errMsg: err})
                return
            }
            res.json({success: true, data: result})
        })
    })
}
let deleteLib = function(req,res,next){
    let id = req.query.id
    user_model.create({_id:id}, function (err, result) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: result})
    })
}
let login = function (req,res,next) {
    let name = req.body.name
    let password = req.body.password
    user_model.find({name:name},function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
        }
        console.log(data)
        if(password == data[0].password){
            let result = {
                name:data[0].name,
                phone:data[0].phone,
                role:data[0].role,
                memo:data[0].memo,
                head:data[0].head,
            }
            console.log(result)
            res.json({success:true,msg:'登录成功',data:result})
        }else {
            res.json({success:false,errMsg:'登录失败!'})
        }
        
    })
}

module.exports = {
    queryGroup:queryGroup,
    queryLib:queryLib,
    login:login,
    updateLib:updateLib,
    addLib:addLib,
    deleteLib:deleteLib
}