let db = require('../../database/db.js')
let order_schema = require('../../database/model/order')
let order_model = db.model('order', order_schema)


let queryGroup = function (req, res, next) {
    order_model.find({}).sort({name: 'asc'}).exec(
        function (err, data) {
            if (err) {
                res.json({success: false, errMsg: err})
                return
            }
            res.json({success: true, data: data})
        }
    )
}
let updateLib = function (req, res, next) {
    let data = req.body
    console.log(data)
    order_model.update({_id: data.id}, {status: data.status},
        function (err, data) {
            if (err) {
                res.json({success: false, errMsg: err})
                return
            }
            res.json({success: true, data: data})
        })
}
let addLib = function (req, res, next) {
    let data = req.body
    order_model.create(data, function (err, data) {
        if (err) {
            res.json({success: false, errMsg: err})
            return
        }
        res.json({success: true, data: data})
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