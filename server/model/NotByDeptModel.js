var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function NotByDeptModel() {

};

// Pedidos atendidos por departamento:
NotByDeptModel.fetchAll = function (orderDPT, callback) {
    console.log("Entrou by-dept")
    var statement = "SELECT * FROM `" + bucketName + "` t1 WHERE t1.orderDept != '" + orderDPT + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderDPT], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = NotByDeptModel;