const path = require('path');
const {parse} = require("csv-parse");
const fs = require('fs');

const habitablePlanets = [];

const file = path.join(__dirname, '..', 'data', 'kepler_data.csv');

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet ['koi_prad'] < 1.6;
}

const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        .on('error', (error) => {
            console.log(error);
            reject(error);
        })
        .on('end', () => {
            console.log(`Our program has found ${habitablePlanets.length} habitable planets!`);
            resolve();
        })
    })
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
};