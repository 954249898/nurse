let db = require('../../database/db.js')
let employee_schema = require('../../database/model/user')
let employee_model = db.model('employee', employee_schema)

let queryGroup = function (req, res, next) {
    employee_model.find(function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
let updateLib = function (req, res, next) {
}
let addLib = function (req, res, next) {
    let data = req.body
    employee_model.create(data, function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
    })
}
let deleteLib = function (req, res, next) {
    let data = req.body
    employee_model.create(data, function (err, result) {
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