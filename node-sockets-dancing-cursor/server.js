import express from 'express';
import path from 'path';
import {createServer} from 'http';
import {WebSocketServer, WebSocket} from 'ws';
import {v4} from "uuid";
import {createClient} from "redis";

const PORT = process.env.PORT || 3000;
const dir = import.meta.dirname;

const wsClients = new Map();

// Express App
const app = express();
app.use(express.static(path.join(dir, 'public')));

// Redis Clients
const redisSubscriber = createClient();
const redisPublisher = createClient();

await redisSubscriber
    .on('error', err => console.error("Redis Subscriber Error:", err))
    .connect();

await redisPublisher
    .on('error', err => console.error("Redis Publisher Error:", err))
    .connect();

await redisSubscriber.subscribe('message', (message) => {
    [...wsClients.keys()].forEach(client => {
        if (client.readyState === WebSocket.OPEN) client.send(message);
    });
}, false);

app.get('/', (req, res) => res.sendFile(path.join(dir, '/public/index.html')));

const server = createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
    const id = v4();
    const color = Math.floor(Math.random() * 360);
    const metadata = {id, color};

    wsClients.set(ws, metadata);

    ws.on('message', async (messageString) => {
        const message = JSON.parse(messageString);
        const metadata = wsClients.get(ws);

        message.sender = metadata.id
        message.color = metadata.color;

        const outbound = JSON.stringify(message);
        await redisPublisher.publish('message', outbound);
    })

    ws.on('error', console.error);

    ws.on('close', () => {
        wsClients.delete(ws);
        console.log('stopping client interval');
    });
});

server.listen(PORT, async () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
