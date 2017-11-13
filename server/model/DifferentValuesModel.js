var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function DifferentValuesModel() {

};

// Pedidos atendidos por data:
DifferentValuesModel.fetchAll = function (callback) {
    console.log("Entrou diff-values")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderNum == t1.chitOrderNum AND t1.chitFinalPrice != t1.orderTotalPrice;"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_"], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = DifferentValuesModel;