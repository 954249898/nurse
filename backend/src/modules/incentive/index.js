let db = require('../../database/db.js')
let incentive_schema = require('../../database/model/incentive')
let incentive_model = db.model('incentive', incentive_schema)

//查
let queryGroup = function (req, res, next) {
    console.log('incentive===================')
    incentive_model.find(function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
//改
let updateLib = function (req, res, next) {
    let data = req.body
    incentive_model.findByIdAndUpdate(data._id,data,function (err,data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
//增
let addLib = function (req, res, next) {
    let data = req.body
    incentive_model.create(data, function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
//删
let deleteLib = function (req, res, next) {
    let id = req.query.id
    incentive_model.remove({_id:id}, function (err, result) {
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