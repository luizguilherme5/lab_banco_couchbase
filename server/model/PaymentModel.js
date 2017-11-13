var uuid = require("uuid"); // For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function PaymentModel() {

};


/* JSON TESTE
{
    "type": "pagamento a parcelado em 12x sem juros",
    "paymentTotalPrice": "287.68",
    "paymentFee": "0.00",
    "paymentCollector": "Banco do ABCD"
}*/

// Metodo para Salvar registro
PaymentModel.save = function(data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.id ? data.id : uuid.v4(),
        type: data.type,
        paymentTotalPrice: data.paymentTotalPrice,
        paymentFee: data.paymentFee,
        paymentEntryDate: Date(data.paymentEntryDate),
        paymentDueDate: Date(data.paymentDueDate),
        paymentDueDateExpiration: Date(data.paymentDueDateExpiration),
        paymentCollector: data.paymentCollector
    }


    var documentId = "payment_" + jsonObject.id;
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
PaymentModel.fetchOne = function(paymentId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
        "FROM `" + bucketName + "` WHERE type='payment' AND id == '" + paymentId + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["payment_" + paymentId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
PaymentModel.fetchAll = function(paymentId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`WHERE type = 'payment';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["payment_" + paymentId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = PaymentModel;