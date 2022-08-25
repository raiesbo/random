// Data structures that allows to mape any type as key
// and results are always returned in the correct order
const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration x',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launch.values())
}

module.exports = {
    getAllLaunches
};