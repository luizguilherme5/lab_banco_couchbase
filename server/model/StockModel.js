var uuid = require("uuid"); // For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function StockModel() {

};

/* JSON TESTE
{
	"type": "stock",
	"stockProducts": {
		"stockProductId": "1",
		"stockProductName": "Doce",
       	"stockProductDescr": "Muito bom!",
        "stockProductQtt": "25",
        "stockProductSupplier": "Cauê",
        "stockProductPrice": "2.50"
	},
	"stockLocation": "Ceilondres"
}*/

// Metodo para Salvar registro
StockModel.save = function(data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.stockId ? data.id : uuid.v4(),
        type: data.type,
        stockProducts: {
            stockProductId: data.stockProducts.stockProductId,
            stockProductName: data.stockProducts.stockProductName,
            stockProductDescr: data.stockProducts.stockProductDescr,
            stockProductEntryDate: Date(data.stockProducts.stockProductEntryDate),
            stockProductQtt: data.stockProducts.stockProductQtt,
            stockProductSupplier: data.stockProducts.stockProductSupplier,
            stockProductPrice: data.stockProducts.stockProductPrice
        },
        stockLocation: data.stockLocation
    }
    var documentId = "stock_" + jsonObject.id;
    console.log(" Doc Id " + documentId);
    console.log("data---" + jsonObject.id + "  " + jsonObject.prodDesc)
    bucket.upsert(documentId, jsonObject, function(error, result) {
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
StockModel.fetchOne = function(stockId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
        "FROM `" + bucketName + "` WHERE type='stock' AND id == '" + stockId + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["stock_" + stockId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
StockModel.fetchAll = function(stockId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`WHERE type = 'stock';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["stock_" + stockId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = StockModel;