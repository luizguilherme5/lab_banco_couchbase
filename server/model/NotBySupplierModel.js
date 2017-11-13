var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function NotBySupplierModel() {

};

// Pedidos atendidos por fornecedor:
NotBySupplierModel.fetchAll = function (orderBS, callback) {
    console.log("Entrou not-by-supplier")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderBudget.orderBudgetSupplier NOT LIKE '" + orderBS + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderBS], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = NotBySupplierModel;