const express = require('express');

const app = express();
const PORT = 3000;

const friends = [
    {
        id: 0,
        name: "Albert Einstein"
    },
    {
        id: 1,
        name: "Sir Isaac Newtown"
    }
]

app.get('/', (req, res) => {
    res.send('helloooos')
})

app.get('/friends', (req, res) => {
    res.json(friends);
})

app.get('/friends/:friendId', (req, res) => {
    const id = Number(req.params.friendId);
    const friend = friends[id];
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).json({
            error: "Friend does not existç"
        });
    }
})

app.get('/messages', (req, res) => {
    res.send('<ul><li>Alber Einstein</li></ul>')
})

app.post('/messages', (req, res) => {
    console.log('Updating messages...')
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}.`);
});