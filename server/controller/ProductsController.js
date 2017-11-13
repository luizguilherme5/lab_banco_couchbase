var ProductModel = require("../model/ProductModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var productsController = function(app) {

    app.post("/lab_banco/sales", saveSale);
    app.get("/lab_banco/sales", fetchAllSales);
    app.get("/lab_banco/sales/:saleid", fetchOneSale);

    //Save Sale Callback
    function saveSale(req, res) {
        console.log("Salvar venda");
        ProductModel.save(req.body, function(error, result, jsonData) {
            if (error) {
                res.set("lab_banco_msg", "Nao foi possivel salvar os dados");
                res.set("lab_banco_msg", "Venda adicionada com sucesso!");
                res.status(400).send();
            }
            console.log(JSON.stringify(jsonData));
            res.set("lab_banco_msg", "Venda adicionada com sucesso!");
            res.status(201).send(jsonData);
        });
    }

    // Fetch by ID Callback
    function fetchOneSale(req, res) {
        ProductModel.fetchOne(req.params.saleid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllSales(req, res) {
        ProductModel.fetchAll(req.params.saleid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = productsController;