var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;
app.listen(port, function() {
    console.log("application listening on port: ", port);
});