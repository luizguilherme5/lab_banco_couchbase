var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function ProductModel() {

};

// Metodo para Salvar registro
ProductModel.save = function (data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.id ? data.id : uuid.v4(),
        productName: data.productName,
        prodDesc: data.prodDesc,
        basePrice: data.basePrice,
        imageLink: data.imageLink ? data.imageLink : "http://listing99.com/images/deals/img_not_found.gif",        
        endDate: data.endDate,
        startDate: data.startDate,
        userEmail: data.userEmail
    }
    var documentId = "sale_" + jsonObject.id;
    console.log(" Doc Id " + documentId);
    console.log("data---" + jsonObject.id + "  " + jsonObject.prodDesc)
    bucket.upsert(documentId, jsonObject, function (error, result) {
        console.log("---" + jsonObject)
        if (error) {
            callback(error, null, jsonObject);
            return;
        }
        callback(null, {
            message: "success",
            data: result
        }, jsonObject);
    });
}

//Método para pegar um registro
ProductModel.fetchOne = function (saleId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
        "FROM `" + bucketName + "` AS sale " +
        "WHERE META(sale).id = $1";
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["sale_" + saleId], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
ProductModel.fetchAll = function (saleId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`;"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["sale_" + saleId], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = ProductModel;