var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function ByDateModel() {

};

// Pedidos atendidos por data:
ByDateModel.fetchAll = function (orderDATE, callback) {
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

module.exports = ByDateModel;