function getChart(botip, color) {
  color = color ? color : getColor();

  var cid = 'live_' + botip.replace(/[-.:]/g, ''),
    highspline = $('#' + cid).highcharts() ;
  if ( typeof highspline !== 'object' ) {
    $('#highcharts').append("<div id='" + cid + "' class='chart'></div>");
    highspline = new Highcharts.StockChart({
      chart : {
        defaultSeriesType : 'spline',
        renderTo : cid,
        events : { load : function() {} }
      },
      title :{
        text : 'Values from ' + botip,
        x : 90, y : 55,
        align : 'left',
        floating : true,
        style : { fontWeight : 'bold' }
      },
      rangeSelector : {
        enabled : true,
        allButtonsEnabled : true,
        buttons : [
          { type : 'second', count : 15, text : '15s' },
          { type : 'second', count : 25, text : '25s' },
          { type : 'second', count : 35, text : '35s' },
          { type : 'minute', count : 1, text : '1m' },
          { type : 'minute', count : 3, text : '3m' }
          // , { type : 'all', text : 'all' }
        ],
        inputEnabled : false
      },
      plotOptions : {
        series : {
          pointStart : (function () {
            var d = new Date();
            return d.getTime() - ( d.getTimezoneOffset() * 60 * 1000 );
          })(),
          pointInterval : 2 * 1000
        }
      },
      series : [ { name : botip, color : color, data : [] } ]
    });
  }

  return highspline;
}

function getColor() {
  // return ('#xyzxyz').replace(/[xyz]/g, function() { return ( (Math.random() * 16) | 0 ).toString(16); });
  var r, b, g;
  var s = 0.72, l = 0.5, h = +Math.round(Math.random() * 360).toFixed(3);

  var c = ( 1 - Math.abs( 2 * l - 1 ) ) * s,
    hq = h / 60, i = Math.floor( hq ),
    x = c * ( 1 - Math.abs( hq % 2 - 1 ) ),
    m = l - 0.5 * c;

  switch(i) {
    case 6:
    case 0: r = c; g = x; b = 0; break;
    case 1: r = x; g = c; b = 0; break;
    case 2: r = 0; g = c; b = x; break;
    case 3: r = 0; g = x; b = c; break;
    case 4: r = x; g = 0; b = c; break;
    case 5: r = c; g = 0; b = x; break;
    default: r = 0; g = 0; b = 0; break;
  }

  var color = [r, g, b];
  for ( var ch in color ) { color[ch] = Math.round( ( color[ch] + m ) * 255 ).toString(16); }
  return '#' + color.join('');
}
