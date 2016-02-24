$(function() {

  var server = prompt('What is the address of the data server?', 'http://127.0.0.1:3000');
  var bots = { 'all' : [] },
    overall = getChart('all');
  var socket = io.connect(server);

  socket.on('connect', function () {
    socket.on('message', function(msg) {
      // console.log(typeof msg);
      msg = JSON.parse(msg);
      if ( !(msg.macAddress in bots) ) bots[msg.macAddress] = [];
      gotData( 'all', +msg.value );

      for (var mac in bots) {
        var values = bots[mac],
          new_val = ( mac === msg.macAddress ) ? msg.value
            : ( values[values.length - 1] ? values[values.length - 1] : 0 );

        values.push(new_val);
        gotData( mac, +new_val );
      }

    });
  });

  function gotData( botip, value ) {
    var chart = getChart(botip),
      serie = chart.series[0],
      shift = serie.data.length > 22;
    value = value ? value : Math.random() * 13 - 2.5;
    serie.addPoint(value, true, shift);
  }
});
