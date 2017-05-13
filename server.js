const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

var clients = [];
var scores_dict = {};
scores_dict['1'] = 0;
scores_dict['2'] = 0;
scores_dict['3'] = 0;
scores_dict['4'] = 0;
scores_dict['5'] = 0;
scores_dict['6'] = 0;

function updateClients() {
	for (client in clients) {
		try {
			clients[client].send(JSON.stringify(scores_dict));
		} catch (e) {

		}
	}
}

function updateClient(client) {
	try {
		client.send(JSON.stringify(scores_dict));
	} catch (e) {
		
	}
}

wss.on('connection', function connection(ws) {
    clients.push(ws);

    updateClients();

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        var itemIndex = parseInt(message);
        if (itemIndex) {
            itemKey = Math.abs(itemIndex).toString();
            if (itemIndex > 0) {
                scores_dict[itemKey] += 1;
            } else {
                //if (scores_dict[itemKey] > 0) {
                    scores_dict[itemKey] -= 1;
                //}
            }
            updateClients();
        }

    });
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});	