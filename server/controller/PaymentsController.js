var PaymentModel = require("../model/PaymentModel");
//var request = require('request'); Use this to call other services-- External Rest services

// This defines my Rest Service
var paymentsController = function(app) {

    app.post("/lab_banco/payments", savePayment);
    app.get("/lab_banco/payments", fetchAllPayments);
    app.get("/lab_banco/payments/:paymentid", fetchOnePayment);

    //Save Sale Callback
    function savePayment(req, res) {
        console.log("Salvar pedido");
        PaymentModel.save(req.body, function(error, result, jsonData) {
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
    function fetchOnePayment(req, res) {
        PaymentModel.fetchOne(req.params.paymentid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }

    // Fetch All Callback
    function fetchAllPayments(req, res) {
        PaymentModel.fetchAll(req.params.paymentid, function(error, result) {
            if (error) {
                res.set("lab_banco_msg", error.message)
                res.status(400).send();
                return;
            }
            res.status(201).send(result);
        })
    }
}

module.exports = paymentsController;