const express = require('express');

const app = express();

async function delay(duration) {
    const startDate = new Date();
    while (new Date() - startDate < duration) {
        // the event loop is blocked...
    }
}

app.get('/', (req, res) => {
    return res.send('Performance example.')
})

app.get('/timer', async (req, res) => {
    delay(9000)
    return res.send('Ding ding ding')
})


app.listen(3000, () => {
    console.log("listening")
})