var OrderModel = require("../model/OrderModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var ordersController = function(app) {

    app.post("/lab_banco/orders", saveOrder);
    app.get("/lab_banco/orders", fetchAllOrders);
    app.get("/lab_banco/orders/:orderid", fetchOneOrder);

    //Save Sale Callback
    function saveOrder(req, res) {
        console.log("Salvar pedido");
        OrderModel.save(req.body, function(error, result, jsonData) {
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
    function fetchOneOrder(req, res) {
        OrderModel.fetchOne(req.params.orderid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllOrders(req, res) {
        OrderModel.fetchAll(req.params.orderid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = ordersController;