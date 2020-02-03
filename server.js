var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var request = require('request');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));

// server your css as static
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/signup.html');
});

app.post('/', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed'
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/923d2cc836df',
        method: 'POST',
        headers: {
            'Authorization': 'Lakshman1 6278c2a98dee0042b8bd0d71e429ba0e-us4'
        },
        body: jsonData
    };

    request(options, function(error, response, body) {
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    })

});

var port = 3000;
app.listen(port, function() {
    console.log("application listening on port: ", port);
});


//apikey - 6278c2a98dee0042b8bd0d71e429ba0e-us4

//listid - 923d2cc836df