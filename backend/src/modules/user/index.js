let db = require('../../database/db.js')
let notification_schema = require('../../database/model/notification')
let notification_model =db.model('user',notification_schema)


let queryGroup = function(req,res,next){
    notification_model.find(function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        res.json({success:true,data:data})
    })
}
let queryLib = function(req,res,next){
    notification_model.find(id,function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        res.json({success:true,data:data})
    })
}
let updateLib = function(req,res,next){}
let addLib = function(req,res,next){}
let deleteLib = function(req,res,next){}

module.exports = {
    queryGroup:queryGroup,
    queryLib:queryLib,
    updateLib:updateLib,
    addLib:addLib,
    deleteLib:deleteLib
}