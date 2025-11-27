import express from 'express';
import path from 'path';
import {createServer} from 'http';
import {WebSocketServer} from 'ws';
import {v4} from "uuid";

const PORT = process.env.PORT || 3000;
const dir = import.meta.dirname;

const clients = new Map();

const app = express();
app.use(express.static(path.join(dir, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(dir, '/public/index.html')));

const server = createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
    const id = v4();
    const color = Math.floor(Math.random() * 360);
    const metadata = {id, color};

    clients.set(ws, metadata);

    ws.on('message', (messageString) => {
        const message = JSON.parse(messageString);
        const metadata = clients.get(ws);

        message.sender = metadata.id
        message.color = metadata.color;

        const outbound = JSON.stringify({
            ...message,
            sender: metadata.id,
            color: metadata.color,
        });

        [...clients.keys()].forEach(client => client.send(outbound));
    })

    ws.on('error', console.error);

    ws.on('close', () => {
        clients.delete(ws);
        console.log('stopping client interval');
    });
});

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});