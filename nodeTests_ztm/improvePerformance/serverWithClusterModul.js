const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

async function delay(duration) {
    const startDate = new Date();
    while (new Date() - startDate < duration) {
        // the event loop is blocked...
    }
}

app.get('/', (req, res) => {
    return res.send(`Performance example ${process.pid}.`)
})

if (cluster.isMaster) {
    console.log("Master has been started...");
    // Number of available CPU cores in your computer
    const NUM_WORKERS = os.cpus().length;
    // Instantiate as many clusters as available CPU cores
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log("Workier process started.");
    // We only .listen when we start as a worker process
    app.listen(3000);
}

app.get('/timer', async (req, res) => {
    delay(9000)
    return res.send(`Ding ding ding ${process.pid}.`)
})


// We only .listen when we start as a worker process
// app.listen(3000, () => {
//     console.log("listening")
// })