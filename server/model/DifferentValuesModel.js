var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function DifferentValuesModel() {

};

// Pedidos atendidos por data:
DifferentValuesModel.fetchAll = function (orderDiff, callback) {
    console.log("Entrou diff-values")
    var statement = "SELECT orderNum, chitOrderNum, orderTotalPrice, chitFinalPrice FROM `" + bucketName + "` t1 WHERE t1.orderNum LIKE t1.chitOrderNum AND t1.chitFinalPrice NOT LIKE t1.orderTotalPrice;"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderDiff], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = DifferentValuesModel;