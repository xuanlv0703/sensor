var mysql = require('mysql');

//Connect mysql server
var connection = mysql.createConnection({
    host: "172.16.0.68",
    user: "dev",
    password: "dev123",
    database: "restful_api_demo"
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfull");
    }
});

module.exports = connection;
