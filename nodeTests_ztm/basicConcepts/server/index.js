const http = require('http');

// const server = http.createServer((req, res) => {
//     // res.writeHead(200, {
//     //     "Content-Type": "text/plain"
//     // })
//     res.writeHead(200, {
//         "Content-Type": "application/json"
//     })
//     // res.end('Hello, Sir Isaac Newtown is your friend!.');
//     res.end(JSON.stringify({
//         id: 1,
//         name: "Sir Isaac Newtown"
//     }));
// })

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: "Albert Einstein"
    },
    {
        id: 1,
        name: "Sir Isaac Newtown"
    },
    {
        id: 2,
        name: "Nikola Tesla"
    }
]

server.on('request', (req, res) => {
    const item = req.url.split('/'); // returns array with the multiple subdirectories
    const method = req.method;

    if (method === 'POST' && item[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            friends.push(JSON.parse(friend));
            console.log(`Creation requestion: ${friend}`)
        });

        // pipe the request to the response and return the sent data.
        req.pipe(res);

    } else if (method === 'GET' && item[1] === 'friends') {
        // res.writeHead(200, {
        //     "Content-Type": "text/plain"
        // })
        res.statusCode = 200;
        res.setHeader('Content-Type', "application/json");
        // res.end(JSON.stringify({
        //     id: 1,
        //     name: "Sir Isaac Newtown"
        // }));

        if (method === 'GET' && !item[2]) {
            res.end(JSON.stringify(friends));
        } else {
            const friendsIndex = Number(item[2]);
            res.end(JSON.stringify(friends[friendsIndex]));
        }
    } else if (item[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What do you think about astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
});