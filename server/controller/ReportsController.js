var OrderModel = require("../model/OrderModel");
var ByDateModel = require("../model/ByDateModel");
var ByDeptModel = require("../model/ByDeptModel");
var BySupplierModel = require("../model/BySupplierModel");
var NotByDateModel = require("../model/NotByDateModel");
var NotByDeptModel = require("../model/NotByDeptModel");
var NotBySupplierModel = require("../model/NotBySupplierModel");
var DifferentValuesModel = require("../model/DifferentValuesModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var reportsController = function(app) {

    app.get("/lab_banco/reports/by-supplier/:orderBudgetSupplier", fetchBySupplier);
    app.get("/lab_banco/reports/by-dept/:orderDept", fetchByDepartment);
    app.get("/lab_banco/reports/by-date/:orderDate", fetchByDate);
    app.get("/lab_banco/reports/not-by-supplier/:orderBudgetSupplier", fetchNotBySupplier);
    app.get("/lab_banco/reports/not-by-dept/:orderDept", fetchNotByDepartment);
    app.get("/lab_banco/reports/not-by-date/:orderDate", fetchNotByDate);
    app.get("/lab_banco/reports/diffvalues", verifyDiffValues);

    //Fetch by Supplier
    function fetchBySupplier(req, res) {
        BySupplierModel.fetchAll(req.params.orderBudgetSupplier, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    function fetchNotBySupplier(req, res) {
        NotBySupplierModel.fetchAll(req.params.orderBudgetSupplier, function(error, result) {
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
        ByDeptModel.fetchAll(req.params.orderDept, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    function fetchNotByDepartment(req, res) {
        NotByDeptModel.fetchAll(req.params.orderDept, function(error, result) {
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
        ByDateModel.fetchAll(req.params.orderDate, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    function fetchNotByDate(req, res) {
        NotByDateModel.fetchAll(req.params.orderDate, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    //Different Values
    function verifyDiffValues(req, res) {
        DifferentValuesModel.fetchAll(function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = reportsController;