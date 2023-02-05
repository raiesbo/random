import './style.css';

// const data = [25, 20, 10, 12, 15];
const data = d3.csv('./data/ages.csv').then(data => {
    const cleanData = data.map(entry => ({ ...entry, age: Number(entry.age) }));

    const svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    const circles = svg.selectAll('circle').data(cleanData);

    circles.enter().append('circle')
        .attr('cx', (d, i) => ((i * 50) + 50))
        .attr('cy', 250)
        .attr('r', (d) => (2 * d.age))
        .attr('fill', 'red');

}).catch((error) => {
    console.log(error)
})


// svg.append('circle')
//     .attr('cx', 200)
//     .attr('cy', 200)
//     .attr('r', 100)
//     .attr('fill', 'red');

// svg.append('rect')
//     .attr('width', 20)
//     .attr('height', 100)
//     .attr('fill', 'blue');
