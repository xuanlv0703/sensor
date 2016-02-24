var socket = io('http://localhost:3000'); var num = 1;
socket.on('message', function(message) {
    var msg = JSON.parse(message);
    console.log(msg);
    if ( num > 10 ) $('#tb-content > tr:last-child').remove();
    if(num % 2 == 0){
    	$('#tb-content').prepend('<tr style="background-color:#AFEEEE;">' + '<td>' + num++ + '</td>' + '<td>' + msg.macAddress + '</td>' + '<td>' + msg.type + '</td>' + '<td>' + msg.ip + '</td>' + '<td>' + msg.user + '</td>' + '<td>' + msg.group + '</td>' + '<td>' + msg.title + '</td>' + '<td>' + msg.value + '</td>' +
        '</tr>');
    }
    else{
		$('#tb-content').prepend('<tr style="background-color:#B0C4DE;">' + '<td>' + num++ + '</td>' + '<td>' + msg.macAddress + '</td>' + '<td>' + msg.type + '</td>' + '<td>' + msg.ip + '</td>' + '<td>' + msg.user + '</td>' + '<td>' + msg.group + '</td>' + '<td>' + msg.title + '</td>' + '<td>' + msg.value + '</td>' +
        '</tr>');
    }
});
