console.log("Seu servidor vai rodar em instantes...");

const express = require('express');
var http = require('http');
var app = express();
const bodyParser = require('body-parser');
const couchbase = require("couchbase");
var config = require("./server/config/config.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket, config.couchbase.password);

var productRoute = require("./server/controller/ProductsController.js")(app)
var userRoute = require("./server/controller/UsersController.js")(app)
var orderRoute = require("./server/controller/OrdersController.js")(app)
var stockRoute = require("./server/controller/StocksController.js")(app)
var chitRoute = require("./server/controller/ChitsController.js")(app)

app.listen(3000, function() {
    console.log('rodando na porta 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/html/index.html');
})