const EventEmitter = require('events');
const celebrity = new EventEmitter();


// Subscribe to celbrity fro Observe 1
celebrity.on('race', (result) => {
    if (result === 'win') {
        console.log('Congratulations, you are the best!');
    }
});

// Subscribe to celbrity fro Observe 2
celebrity.on('race', (result) => {
    if (result === 'lost') {
        console.log('Boo, I could have done bette than that!');
    }
});

process.on('exit', (code) => {
    console.log('Process exit event with code:', code)
})

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');