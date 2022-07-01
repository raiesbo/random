const process = require('process');

const mission = process.argv[2];

if (mission === 'learn') {
    console.log('Time to write some Node.js')
} else {
    console.log(`trololo ${mission}.`)
}

// console.log(process.argv)