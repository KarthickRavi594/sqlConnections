var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var sql = require("mssql");
var configFile = require('./config');
var writeData = require('./jsonWriter');

const port = process.env.PORT || 3456;

app.listen(port, err => {
    if (err) console.log(err);
    else {
        console.log("Running in ", port);
    }
});

app.use(bodyParser.json());

var config = configFile;

sql.connect(config, function (err) {
    if (err) {
        console.log(err);
    }
});

var request = new sql.Request();

var data;

app.post('/insert', function (req, res) {
    request.query("insert into login values ('" + req.body.usernamedb + "','" + req.body.passworddb + "')", function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset);
    });
})

app.post('/delete', function (req, res) {
    var sqlQuery = "delete from login where usernamedb = '" + req.body.usernamedb + "'";
    request.query(sqlQuery, function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset);
    })
})

app.get('/', function (req, res) {
    var sqlQuery = "select * from markdetails";
    request.query(sqlQuery, function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset.recordsets[0]);
        // return recordset.recordsets[0];
        data = recordset.recordsets[0];
        console.log(data);
        // writeData.writeData(data);
    })
})

app.post('/update', function (req, res) {
    var sqlQuery = "update login set passworddb = '" + req.body.NewPassword + "' where usernamedb = '" + req.body.usernamedb + "'";
    request.query(sqlQuery, function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset);
    })
})