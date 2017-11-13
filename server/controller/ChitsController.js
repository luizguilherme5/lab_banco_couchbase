var ChitModel = require("../model/ChitModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var chitsController = function(app) {

    app.post("/lab_banco/chits", saveChit);
    app.get("/lab_banco/chits", fetchAllChits);
    app.get("/lab_banco/chits/:chitid", fetchOneChit);

    //Save Sale Callback
    function saveChit(req, res) {
        console.log("Salvar pedido");
        ChitModel.save(req.body, function(error, result, jsonData) {
            if (error) {
                res.set("lab_banco_msg", "Nao foi possivel salvar os dados");
                res.set("lab_banco_msg", "Pedido adicionado com sucesso!");
                res.status(400).send();
            }
            console.log(JSON.stringify(jsonData));
            res.set("lab_banco_msg", "Pedido adicionado com sucesso!");
            res.status(201).send(jsonData);
        });
    }

    // Fetch by ID Callback
    function fetchOneChit(req, res) {
        ChitModel.fetchOne(req.params.chitid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllChits(req, res) {
        ChitModel.fetchAll(req.params.chitid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = chitsController;