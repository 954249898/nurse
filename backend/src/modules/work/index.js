let db = require('../../database/db.js')
let work_schema = require('../../database/model/work')
let work_model = db.model('work', work_schema)


let queryGroup = function (req, res, next) {
    work_model.find(function (err, data) {
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
    work_model.create(data, function (err, result) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: result})
    })
}
let deleteLib = function (req, res, next) {
}

module.exports = {
    queryGroup: queryGroup,
    updateLib: updateLib,
    addLib: addLib,
    deleteLib: deleteLib
}