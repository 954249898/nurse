let db = require('../../database/db.js')
let train_schema = require('../../database/model/train')
let train_model =db.model('train',train_schema)


let queryGroup = function(req,res,next){
    train_model.find(function (err,data) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        res.json({success:true,data:data})
    })
}
let updateLib = function(req,res,next){}
let addLib = function(req,res,next){
    let data = req.body
    train_model.create(data, function (err, result) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: result})
    })
}
let deleteLib = function(req,res,next){

}

module.exports = {
    queryGroup:queryGroup,
    updateLib:updateLib,
    addLib:addLib,
    deleteLib:deleteLib
}