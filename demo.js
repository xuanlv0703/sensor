var request = require('request');
request.post('http://172.16.0.117:8161/api/message/TEST?type=queue', {
    'auth': {
        'username': 'admin',
        'password': 'admin'
    }
}, function(error, response, body) {

    if (error) {
        console.log(error);
    } else {
        console.log(body);
    }
})
