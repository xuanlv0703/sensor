var mysql = require('mysql');

//Connect mysql server
var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    port: process.env.OPENSHIFT_MYSQL_DB_PORT,
    user: "adminznjx3LZ",
    password: "nnyuzprrfxqX",
    database: "sensor",
    socket: '/var/lib/openshift/56cd63e12d52712727000057/mysql//socket/mysql.sock'
});

// var connection = mysql.createConnection({
//     host: '172.16.0.68',
//     port: '3306',
//     user: "dev",
//     password: "dev123",
//     database: "restful_api_demo"
// });

// var connection = mysql.createConnection({
//    host: 'mysql://' + process.env.OPENSHIFT_MYSQL_DB_HOST + ':' + process.env.OPENSHIFT_MYSQL_DB_PORT + '/',
//     user: "adminznjx3LZ",
//     password: "nnyuzprrfxqX",
//     database: "sensor"
// });



connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfull");
    }
});

module.exports = connection;
