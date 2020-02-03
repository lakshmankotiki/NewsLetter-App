var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
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

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'lakshman.kotiki@indianic.com',
            pass: '*******'
        },
        tls: { rejectUnauthorized: false },
        debug: true
    });

    var mailOptions = {
        from: 'lakshman.kotiki@indianic.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

var port = 3000;
app.listen(port, function() {
    console.log("application listening on port: ", port);
});