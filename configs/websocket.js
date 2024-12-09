const WebSocket = require("ws");

let webSocketServer;
const clients = new Map();

const initWebSocket = (server) => {
    webSocketServer = new WebSocket.Server({server}); // Maps user IDs to WebSocket connections

    webSocketServer.on('connection', (ws, req) => {
        // Extract userId from query params
        const userId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('userId');
        // console.log("userId:", userId);
        if (userId) {
            clients.set(userId, ws);
            // console.log(`Websocket connected for user: ${userId}`);

            ws.on('close', () => {
                clients.delete(userId);
                // console.log(`Websocket disconnected for user: ${userId}`);
            });
        }
    });
}

const sendUpdate = (userId, message) => {
    const ws = clients.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    }
}

module.exports = {initWebSocket, sendUpdate};