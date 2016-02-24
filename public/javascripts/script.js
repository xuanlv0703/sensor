$(document).ready(function() {
    var listAllSensor = null;

    function resultsTable(data) {
        var color_while = '<tr style="background-color:#fff;">';
        var color_blue = '<tr style="background-color:#00ffff;">',
            color = [color_while, color_blue];
        for (var i = 0; i < data.length; i++) {
            // if (data[i].isActive === 0) {
            //     color = color_while;
            // } else {
            //     color = color_blue;
            // }
            $('#tb-content').append(
                color[data[i].isActive] + '<td><a data-toggle="modal" data-target="#myModal">' + data[i].macAddress + '</a></td>' + '<td><a data-toggle="modal" data-target="#myModal">' + data[i].user + '</a></td>' + '<td><a data-toggle="modal" data-target="#myModal">' + data[i].group + '</a></td>' + '<td><a data-toggle="modal" data-target="#myModal">' + data[i].tenant + '</a></td>' + '<td><a data-toggle="modal" data-target="#myModal"><lable>' + (data[i].isActive ? "ON" : "OFF") + '</lable></a></td>' + '</tr>'
            );
        };
    }

    /*get all sensor*/
    $.ajax({
        url: 'http://localhost:3000/sensors',
        data: {
            format: 'json'
        },
        error: function(err) {
            $('#errInfo').html('<p>An error</p>');
            console.log(err);
        },
        dataType: 'jsonp',
        success: function(data) {
            listAllSensor = data;
            resultsTable(data);
        },
        type: 'GET'
    });

    /*get element of user*/
    $.ajax({
        url: 'http://localhost:3000/group/user',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#filterUser').append(
                    '<option>' + data[i].user + '</option>'
                );
            };
        }
    });

    /*get element of group*/
    $.ajax({
        url: 'http://localhost:3000/group/group',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#filterGroup').append(
                    '<option>' + data[i].group + '</option>'
                );
            };
        }
    });

    /*get element of tenant*/
    $.ajax({
        url: 'http://localhost:3000/group/tenant',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#filterTenant').append(
                    '<option>' + data[i].tenant + '</option>'
                );
            };
        }
    });

    function filterGroup(group, optionValue) {
        $.ajax({
            url: 'http://localhost:3000/group/' + group + '/' + optionValue,
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            success: function(data) {
                $('#tb-content tr').remove();
                resultsTable(data);
            }
        });

    }

    $("#filterUser").change(function() {
        if ($(this).val() !== "All") {
            var optionValue = $(this).val();
            filterGroup("user", optionValue);
        } else {
            resultsTable(listAllSensor);
        }
    });

    $("#filterGroup").change(function() {
        if ($(this).val() !== "All") {
            var optionValue = $(this).val();
            filterGroup("group", optionValue);
        } else {
            resultsTable(listAllSensor);
        }
    });

    $("#filterTenant").change(function() {
        if ($(this).val() !== "All") {
            var optionValue = $(this).val();
            filterGroup("tenant", optionValue);
        } else {
            resultsTable(listAllSensor);
        }
    });

    //Post a message to Queues
    $("#postMessage").click(function() {
        $.ajax({
            url: 'http://localhost:3000/message',
            type: 'post',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);
                alert("Success " + data);
            }
        });
    });
});
