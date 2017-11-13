var uuid = require("uuid");// For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function OrderModel() {

};


// JSON TESTE
// {
//     "type": "order",
//     "orderNum": "Luiz Guilherme",
//     "orderProducts": [{
//         "orderProductId": "1",
//         "orderProductName": "Cimento",
//         "orderProductDesc": "Feito para grudar coisas",
//         "orderProductQtt": "10"
//     }],
//     "orderBudget": [{
//         "orderBudgetSupplier": "Votorantins",
//         "orderBudgetPrice": "8.90",
//         "orderBudgetChosen": "yes"
//     }],
//     "orderPaymentCondition": "Parcelado",
//     "orderDept": "Engenharia",
//     "orderStatus": "Atendido",
//     "orderDate": "2017-11-15"
// }

// Metodo para Salvar registro
OrderModel.save = function (data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.id ? data.id : uuid.v4(),
        type: data.type,
        orderNum: data.orderNum,
        orderProducts: {
            orderProductId: data.orderProducts.orderProductId,
            orderProductName: data.orderProducts.orderProductName,
            orderProductDesc: data.orderProducts.orderProductDesc,
            orderProductQtt: data.orderProducts.orderProductQtt,
            orderProductSupplier: data.orderProducts.orderProductSupplier,
            orderProductPrice: data.orderProducts.orderProductPrice
        },
        orderBudget: {
            orderBudgetSupplier: data.orderBudget.orderBudgetSupplier,
            orderBudgetPrice: data.orderBudget.orderBudgetPrice,
            orderBudgetChosen: data.orderBudget.orderBudgetChosen
        },
        orderPaymentCondition: data.orderPaymentCondition,
        orderDept: data.orderDept,
        orderStatus: data.orderStatus,
        orderDate: data.orderDate
    }


    var documentId = "order_" + jsonObject.id;
    bucket.upsert(documentId, jsonObject, function (error, result) {
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
OrderModel.fetchOne = function (orderId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
    "FROM `" + bucketName + "` WHERE type='order' AND id == '" + orderId + "';"  
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderId], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
OrderModel.fetchAll = function (orderId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`WHERE type = 'order';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["order_" + orderId], function (error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = OrderModel;