const express = require('express');

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

app.get('/timer', async (req, res) => {
    delay(5000)
    return res.send(`Ding ding ding Dong!!! ${process.pid}.`)
})

// We only .listen when we start as a worker process
app.listen(3000, () => {
    console.log("listening")
})