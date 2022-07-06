const express = require('express');
const friendsRouter = require('./routers/friends.router');
const messagesRouter = require('./routers/messages.router');

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
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`)
})

app.use(express.json());
// END OF MIDDLEWARES

app.get('/', (req, res) => {
    res.send('helloooo')
});

// We mount it to '/friends' which will be the common url path.
app.use('/friends', friendsRouter); 
app.use('/messages', messagesRouter); 

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}.`);
});
