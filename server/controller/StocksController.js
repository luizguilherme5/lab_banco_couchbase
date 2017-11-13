var StockModel = require("../model/StockModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var stocksController = function(app) {

    app.post("/lab_banco/stocks", saveStock);
    app.get("/lab_banco/stocks", fetchAllStocks);
    app.get("/lab_banco/stocks/:stockid", fetchOneStock);

    //Save stock Callback
    function saveStock(req, res) {
        console.log("Salvar estoque");
        StockModel.save(req.body, function(error, result, jsonData) {
            if (error) {
                res.set("lab_banco_msg", "Nao foi possivel salvar os dados!");
                res.set("lab_banco_msg", "Produto adicionado com sucesso!");
                res.status(400).send();
            }
            console.log(JSON.stringify(jsonData));
            res.set("lab_banco_msg", "Produto adicionado com sucesso!");
            res.status(201).send(jsonData);
        });
    }

    // Fetch by ID Callback
    function fetchOneStock(req, res) {
        StockModel.fetchOne(req.params.stockid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllStocks(req, res) {
        StockModel.fetchAll(req.params.stockid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = stocksController;