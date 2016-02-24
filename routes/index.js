var express = require('express');
var router = express.Router();
var mysqlConn = require('./db.js');
var mqtt = require('mqtt');

//config send a message to queue
var request = require('request');

/* GET home page and result details of sensor . */
router.get('/', function(req, res, next) {
    res.sendFile("index.html");
});

router.get('/sensors', function(req, res) {
    var select_query = "SELECT * from sensor_configs";
    mysqlConn.query(select_query, function(err, rows, fields) {
        if (err) {
            return res.jsonp(err);
        } else {
            return res.jsonp(rows);
        }
    });
});

/*GET element of Group*/
router.get('/group/:name', function(req, res) {
    var groupName = req.params.name;
    var listElementGroup = "SELECT DISTINCT ?? FROM ??";
    var table = [groupName, "sensor_configs"];
    listElementGroup = mysqlConn.format(listElementGroup, table);
    mysqlConn.query(listElementGroup, function(err, rows) {
        if (err) {
            return res.jsonp("Fails");
        } else {
            for (var i in rows) {}
            return res.jsonp(rows);
        }
    });
});

/*GET List all element in group */
router.get('/group/:name/:id', function(req, res) {
    var groupName = req.params.name;
    var id = req.params.id;
    var filByGroup = "SELECT * FROM ?? WHERE ?? = ?";
    var table = ["sensor_configs", "sensor_configs." + groupName + "", id];
    filByGroup = mysqlConn.format(filByGroup, table);
    mysqlConn.query(filByGroup, function(err, rows) {
        if (err) {
            res.jsonp("Fails");
        } else {
            res.jsonp(rows);
        }
    });
});


/*POST a command line*/
router.post('/message', function(req, res) {
    request({
        url: 'http://admin:admin@172.16.0.69:8161/api/message/TEST?type=queue', //URL to hit
        method: 'POST',
        body: 'Hello Hello! String body!' //Set the body as a string
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            res.jsonp(response.statusCode, body);
        }
    });
});

/*GET a message from queue*/
router.get('/message', function(req, res) {
    res.jsonp("GET message");
});

/*statistic isActive - On -Off*/
router.get('/statisticIsActive', function(req, res) {
    var groupName = req.params.name;
    var id = req.params.id;
    var filByGroup = "SELECT ?? FROM ??";
    var table = ["isActive", "sensor_configs"];
    filByGroup = mysqlConn.format(filByGroup, table);
    mysqlConn.query(filByGroup, function(err, rows) {
        if (err) {
            res.jsonp("Fails");
        } else {
            res.jsonp(rows);
        }
    });
});


module.exports = router;
