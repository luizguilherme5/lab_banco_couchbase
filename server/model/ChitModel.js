var uuid = require("uuid"); // For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function ChitModel() {

};


/* JSON TESTE
{
    "type": "chit",
    "chitFinalPrice": "125.98",
    "chitAliquotIPI": "6.5%",
    "chitValueIPI": "8.19",
    "chitAliquotICMS": "10.5%",
    "chitValueICMS": "13.23",
    "chitProducts": {
        "chitProductId": "1",
        "chitProductName": "Cimento",
        "chitProductPrice": "28.99"
    },
    "chitNum": "03",
    "chitOrderNum": "159"
}*/

// Metodo para Salvar registro
ChitModel.save = function(data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.id ? data.id : uuid.v4(),
        type: data.type,
        chitFinalPrice: data.chitFinalPrice,
        chitAliquotIPI: data.chitAliquotIPI,
        chitValueIPI: data.chitValueIPI,
        chitAliquotICMS: data.chitAliquotICMS,
        chitValueICMS: data.chitValueICMS,
        chitProducts: {
            chitProductId: data.chitProducts.chitProductId,
            chitProductName: data.chitProducts.chitProductName,
            chitProductPrice: data.chitProducts.chitProductPrice
        },
        chitNum: data.chitNum,
        chitOrderNum: data.chitOrderNum
    }


    var documentId = "chit_" + jsonObject.id;
    bucket.upsert(documentId, jsonObject, function(error, result) {
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
ChitModel.fetchOne = function(chitId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
        "FROM `" + bucketName + "` WHERE type='chit' AND id == '" + chitId + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["chit_" + chitId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
ChitModel.fetchAll = function(chitId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`WHERE type = 'chit';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["chit_" + chitId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = ChitModel;