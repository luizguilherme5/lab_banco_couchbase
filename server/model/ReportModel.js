var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function ReportModel() {

};

// Pedidos atendidos por fornecedor:
ReportModel.fetchAll = function (orderBS, callback) {
    console.log("Entrou by-supplier")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderBudget.orderBudgetSupplier == '" + orderBS + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderBS], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

// Pedidos atendidos por departamento:
ReportModel.fetchAll = function (orderDPT, callback) {
    console.log("Entrou by-dept")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderDept == '" + orderDPT + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderDPT], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

// Pedidos atendidos por data:
ReportModel.fetchAll = function (orderDATE, callback) {
    console.log("Entrou by-date")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderDate == '" + orderDATE + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderDATE], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

// Pedidos não atendidos por fornecedor:
ReportModel.fetchAll = function (orderNBS, callback) {
    console.log("Entrou not-by-supplier")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderBudget.orderBudgetSupplier NOT LIKE '" + orderNBS + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderNBS], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

// Pedidos não atendidos por departamento:
ReportModel.fetchAll = function (orderNDPT, callback) {
    console.log("Entrou not-by-dept")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderDept NOT LIKE '" + orderNDPT + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderNDPT], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

// Pedidos não atendidos por data:
ReportModel.fetchAll = function (orderNDATE, callback) {
    console.log("Entrou not-by-date")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderDate NOT LIKE '" + orderNDATE + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderNDATE], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}




module.exports = ReportModel;