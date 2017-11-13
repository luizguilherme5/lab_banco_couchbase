var ReportModel = require("../model/ReportModel");
var OrderModel = require("../model/OrderModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var reportsController = function(app) {

    app.get("/lab_banco/reports/by-supplier/:orderBudgetSupplier", fetchBySupplier);
    app.get("/lab_banco/reports/by-dept/:orderDept", fetchByDepartment);
    app.get("/lab_banco/reports/by-date/:orderDate", fetchByDate);
    app.get("/lab_banco/reports/not-by-supplier/:orderBudgetSupplier", fetchBySupplier);
    app.get("/lab_banco/reports/not-by-dept/:orderDept", fetchByDepartment);
    app.get("/lab_banco/reports/not-by-date/:orderDate", fetchByDate);

    //Fetch by Supplier
    function fetchBySupplier(req, res) {
        ReportModel.fetchAll(req.params.orderBudgetSupplier, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    //Fetch by Department
    function fetchByDepartment(req, res) {
        ReportModel.fetchAll(req.params.orderDept, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    //Fetch by Date
    function fetchByDate(req, res) {
        ReportModel.fetchAll(req.params.orderDate, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // // Fetch All Callback
    // function fetchAllUsers(req, res) {
    //     UserModel.fetchAll(req.params.userid, function(error, result) {
    //         if (error) {
    //             res.set("lab_banco_msg", error.message)
    //             res.status(400).send();
    //             return;
    //         }
    //         res.status(201).send(result);
    //     })
    // }
}

module.exports = reportsController;