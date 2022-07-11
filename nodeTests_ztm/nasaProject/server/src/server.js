const http = require('http');

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.module');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
