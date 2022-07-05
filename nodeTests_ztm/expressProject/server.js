const express = require('express');
const messagesController = require('./controllers/messages.controller');
const friendsController = require('./controllers/friends.controller');

const app = express();
const PORT = 3000;

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

app.get('/', (req, res) => {
    res.send('helloooo')
});

app.post('/friends', friendsController.postFriend);
app.get('/friends', friendsController.getFriends);
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}.`);
});
