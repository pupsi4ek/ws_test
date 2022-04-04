const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

var decoder = new TextDecoder('utf-8');

function ab2str(buf) {
  return decoder.decode(new Uint8Array(buf));
}

let current_user = null;

server.on('connection', (ws) => {
  ws.on('message', (data) => {
    let message = JSON.parse(ab2str(data));
    if (message.message === 'start') {
      current_user = message.id;
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ id: current_user, message: 'block' }));
        }
      });
    } else if (message.message === 'end') {
      current_user = null;
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ id: current_user, message: 'go' }));
        }
      });
    }
  });
  ws.send(JSON.stringify({ id: current_user, message: 'welcome' }));
});
