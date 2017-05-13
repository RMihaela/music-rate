$(document).ready(function () {
    var ws = new WebSocket('ws://localhost:8080');

    var groupStr = '';
    var groupNumber = 0;
    var songInput = '';

    ws.onopen = function () {
        ws.send('initial');
    };

    ws.onmessage = function (response) {
        if (response.data) {
            var scores_dict = JSON.parse(response.data);
            for (var key in scores_dict) {
                var votes = scores_dict[key];
                var badgeId = 'badge-' + key;
                var badge = document.getElementById(badgeId);
                if (badge) {
                    badge.innerHTML = votes;
                }
            }
        }
    };

    function extractInt(string) {
        return string.replace(/[^0-9]/g, '');
    }

    $('.btnDown').on('click', function () {
		//id parinte
        groupStr = $(this).parent().attr('id');
		//extragem nr din id parinte
        groupNumber = extractInt(groupStr);
        ws.send(-groupNumber);
    });

    $('.btnUp').on('click', function () {
		//id parinte
        groupStr = $(this).parent().attr('id');
		
		//extragem nr din id parinte
        groupNumber = extractInt(groupStr);
        ws.send(groupNumber);
    });
});