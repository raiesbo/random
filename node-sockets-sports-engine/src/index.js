import express from 'express'
import {matchRouter} from "./routes/matches.js";
import * as http from "node:http";
import {attachWebSocketServer} from "./ws/server.js";

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
const server = http.createServer(app);


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/matches', matchRouter)

const {broadcastMatchCreated} = attachWebSocketServer(server)
app.locals.broadcastMatchCreated = broadcastMatchCreated

server.listen(PORT, HOST, () => {
    console.log(`App listening on port ${PORT}!`)
});
