var uuid = require("uuid"); // For Unique ID Genration
var bucket = require("../../index").bucket;
var config = require("../config/config");
var N1qlQuery = require('couchbase').N1qlQuery;
const bucketName = "lab_banco"

function UserModel() {

};

/* JSON TESTE
{
    "type": "user",
    "userName": "Luiz Guilherme",
    "userCpf": "12345678911",
    "userRg": "1234567",
    "userMother": "Maria da Silva",
    "userFather": "João da Silva",
    "userAddress": "Rua dos Papagaios, 47",
    "userPhone": "+5561999999999",
    "userEmail" : "email@hotmail.com",
    "userScholarity": "Ensino médio completo",
    "userNaturalness": "Brasil",
    "userRole": "Administrador"
}*/

// Metodo para Salvar registro
UserModel.save = function(data, callback) {
    console.log(" Inicializando dados JSON ");
    var jsonObject = {
        id: data.id ? data.id : uuid.v4(),
        type: data.type,
        userName: data.userName,
        userCpf: data.userCpf,
        userRg: data.userRg,
        userMother: data.userMother,
        userFather: data.userFather,
        userAddress: data.userAddress,
        userPhone: data.userPhone,
        userEmail: data.userEmail,
        userScholarity: data.userScholarity,
        userNaturalness: data.userNaturalness,
        userRole: data.userRole
    }
    var documentId = "user_" + jsonObject.id;
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
UserModel.fetchOne = function(userId, callback) {
    console.log(" Pegando um registro ");
    var statement = "SELECT * " +
        "FROM `" + bucketName + "` WHERE type='user' AND id == '" + userId + "';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["user_" + userId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

//Método para pegar todos os registros
UserModel.fetchAll = function(userId, callback) {
    console.log(" Pegando todos os registros ");
    var statement = "SELECT * FROM `" + bucketName + "`WHERE type = 'user';"
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, ["user_" + userId], function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = UserModel;