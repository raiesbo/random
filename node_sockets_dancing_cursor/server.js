const express = require('express');
const path = require('path');
const {createServer} = require('http');
const {WebSocketServer} = require('ws');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

const server = createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection', function (ws) {
    ws.on('error', console.error);

    ws.on('close', function () {
        console.log('stopping client interval');
    });
});

server.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}`);
});