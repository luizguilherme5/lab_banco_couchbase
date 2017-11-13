var UserModel = require("../model/UserModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var usersController = function(app) {

    app.post("/lab_banco/users", saveUser);
    app.get("/lab_banco/users", fetchAllUsers);
    app.get("/lab_banco/users/:userid", fetchOneUser);

    //Save Sale Callback
    function saveUser(req, res) {
        console.log("Salvar usuário");
        UserModel.save(req.body, function(error, result, jsonData) {
            if (error) {
                res.set("lab_banco_msg", "Nao foi possivel salvar os dados");
                res.set("lab_banco_msg", "Usuário adicionado com sucesso!");
                res.status(400).send();
            }
            console.log(JSON.stringify(jsonData));
            res.set("lab_banco_msg", "Usuário adicionado com sucesso!");
            res.status(201).send(jsonData);
        });
    }

    // Fetch by ID Callback
    function fetchOneUser(req, res) {
        UserModel.fetchOne(req.params.userid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllUsers(req, res) {
        UserModel.fetchAll(req.params.userid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = usersController;