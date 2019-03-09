var express = require('express');
var router = express.Router();

let user_httphandler = require('../src/modules/user/index')
let employee_httphandler = require('../src/modules/employee/index')
let notification_httphandler = require('../src/modules/notification/index')
let order_httphandler = require('../src/modules/order/index')
let work_httphandler = require('../src/modules/work/index')

//订单管理
router.route('/order')
    .get(function(req,res,next){
        order_httphandler.queryGroup(req,res,next)
    })
    .put(function (req,res,next) {
        console.log(req.body)
        order_httphandler.updateLib(req,res,next)
    })
    .post(function (req,res,next) {
        order_httphandler.addLib(req,res,next)

    })
    .delete(function (req,res,next) {
        order_httphandler.deleteLib(req,res,next)
    })

//护工信息
router.route('/employee')
    .get(function(req,res,next){
        employee_httphandler.queryGroup(req,res,next)

    })
    .put(function (req,res,next) {
        employee_httphandler.updateLib(req,res,next)
    })
    .post(function (req,res,next) {
        employee_httphandler.addLib(req,res,next)
    })
    .delete(function (req,res,next) {
        employee_httphandler.deleteLib(req,res,next)
    })

//通知管理
router.route('/notification')
    .get(function(req,res,next){
        notification_httphandler.queryGroup(req,res,next)

    })
    .put(function (req,res,next) {
        notification_httphandler.updateLib(req,res,next)
    })
    .post(function (req,res,next) {
        notification_httphandler.addLib(req,res,next)

    })
    .delete(function (req,res,next) {
        notification_httphandler.deleteLib(req,res,next)
    })

//用户管理
router.route('/user')
    .get(function(req,res,next){
        console.log('uuuuuuuuuu')
        user_httphandler.queryGroup(req,res,next)

    })
    .put(function (req,res,next) {
        user_httphandler.updateLib(req,res,next)
    })
    .post(function (req,res,next) {
        user_httphandler.addLib(req,res,next)

    })
    .delete(function (req,res,next) {
        user_httphandler.deleteLib(req,res,next)
    })

//排班管理
router.route('/work')
    .get(function(req,res,next){
        order_httphandler.queryGroup(req,res,next)

    })
    .put(function (req,res,next) {
        work_httphandler.updateLib(req,res,next)
    })
    .post(function (req,res,next) {
        work_httphandler.addLib(req,res,next)

    })
    .delete(function (req,res,next) {
        work_httphandler.deleteLib(req,res,next)
    })







module.exports = router