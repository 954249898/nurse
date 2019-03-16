let db = require('../../database/db.js')
let employee_schema = require('../../database/model/user')
let employee_model = db.model('user', employee_schema)

let queryGroup = function (req, res, next) {
    console.log('employee===================')
    employee_model.find({role:2},function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
let updateLib = function (req, res, next) {
    let data = req.body
    employee_model.findByIdAndUpdate(data._id,data,function (err,data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
let addLib = function (req, res, next) {
    let data = req.body
    employee_model.find({name:data.name},function (err,result) {
        if(err){
            res.json({success:false,errMsg:err})
            return
        }
        console.log('===========================')
        console.log(result)
        if(data.length > 0){
            res.json({success:false,errMsg:'用户名已存在!'})
            return
        }
        employee_model.create(data, function (err, addResult) {
            if (err) {
                res.json({success: false, errMsg: err})
                return
            }
            res.json({success: true, data: addResult})
        })
    })
}
let deleteLib = function (req, res, next) {
    let id = req.query.id
    employee_model.remove({_id:id}, function (err, result) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: result})
    })
}

module.exports = {
    queryGroup: queryGroup,
    updateLib: updateLib,
    addLib: addLib,
    deleteLib: deleteLib
}