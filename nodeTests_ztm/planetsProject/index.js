const {parse} = require("csv-parse");
const fs = require('fs');

const results = [];

const file = 'kepler_data.csv';

fs.createReadStream(file)
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (error) => {
        console.log(error)
    })
    .on('end', () => {
        console.log(results);
        console.log('end of stream')
    })
    