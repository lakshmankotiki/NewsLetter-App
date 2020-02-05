var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
//importing custom module
var configs = require('./configs');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));

// serve our css as static
app.use(express.static('public'));


//home route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/signup.html');
});

//post route to send email news letter for subscribers
app.post('/', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    //sending this data to the mailchimp API with specific attributes
    var data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);

    //sending options to the request module
    var options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/' + configs.LIST_KEY,
        method: 'POST',
        headers: {
            'Authorization': 'confidential ' + configs.SECRET_KEY,
        },
        body: jsonData,
        mode: 'no-cors'
    };

    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            if (response.statusCode === 200) {
                var parsedData = JSON.parse(body);
                //checking duplicate mail exist or not based on mailchimp returned data
                if (parsedData.error_count === 0) {
                    res.sendFile(__dirname + '/public/html/success.html');
                } else {
                    console.log("response is: ",parsedData);
                    res.send("<h1> Failed: </h1>" + "<i><big>The reason behind failed is probably be the duplicate mail. provided mail already existed in our databases. Please look at the response in console</big></i>")
                }
            } else {
                res.sendFile(__dirname + '/public/html/failure.html');
            }
        }
    });

});

var port = 3000;
app.listen(port, function() {
    console.log("application listening on port: ", port);
});