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

// MIDDLEWARES
app.use((req, res, next) => {
    const start = Date.now();

    // next() function needs to be triggered
    // in order to pass to the next step
    next();

    // Everything after the next() function
    // will happen after the endpoint is triggered
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`)
})

app.use(express.json());
// END OF MIDDLEWARES

app.post('/friends', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        });
    };

    const newFriend = {
        name: req.body.name,
        id: friends.length
    };
    friends.push(newFriend);

    res.send(newFriend);
})

app.get('/', (req, res) => {
    res.send('helloooo')
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
