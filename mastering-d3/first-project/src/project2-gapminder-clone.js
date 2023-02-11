/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// {
//     "continent": "asia",
//     "country": "Vanuatu",
//     "income": 585,
//     "life_exp": 24.3,
//     "population": 27791
// }

const continentColors = {
    "europe": '#6096B4',
    "asia": '#93BFCF',
    "americas": '#BDCDD6',
    "africa": '#EEE9DA',
    "asia": '#B6EADA'
}

const MARGIN = { TOP: 10, RIGHT: 10, BOTTOM: 30, LEFT: 50 };
const HEIGHT = 400;
const WIDTH = 600;

const clearHeight = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;
const clearWidth = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;

const svg = d3.select('#chart-area').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const g = svg.append('g')
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

const xAxisGroup = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${clearHeight})`);

const yAxisGroup = g.append('g')
    .attr('class', 'y axis');

const x = d3.scaleLinear()
    .range([0, clearWidth]);

const y = d3.scaleLinear()
    .range([clearHeight, 0]);

const radiusScale = d3.scaleLinear()
    .range([5, 30])

const yearText = svg.append('text')
    .attr('transform', `translate(${clearWidth}, ${clearHeight})`)
    .attr('font-size', 20);

d3.json("data/gdpData.json").then((data) => {
    let i = 0;

    updateChart(data[i])

    d3.interval(() => {
        updateChart(data[++i])
    }, 1000)
})

const updateChart = (data) => {
    const year = data.year;
    const countries = data.countries;

    const t = d3.transition().duration(750);

    x.domain([0, d3.max(countries.map(country => country.income))]);
    y.domain([0, d3.max(countries.map(country => country.life_exp))]);

    const xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    yAxisGroup.transition(t).call(yAxisCall);

    radiusScale.domain([0, d3.max(countries.map(country => country.population))])

    // DATA JOIN. Join new data with old elements
    const circles = g.selectAll('circle').data(countries, d => d.population);

    // // EXIT old elements not present in new data
    circles.exit()
        .transition(t)
        .attr('fill-opacity', 0)
        .remove();

    // // ENTER new elements present in new data
    circles.enter().append('circle')
        .data(countries)
        .attr("fill", d => continentColors[d.continent])
        .attr("r", d => radiusScale(d.population))
        .attr('cx', d => x(d?.income || 0))
        .attr('cy', d => clearHeight - y(d?.life_exp || 0))
        .attr('fill-opacity', 0)
        // UPDATE old elements present in new data
        .merge(circles)
        .transition(t)
        .attr('fill-opacity', 1)

    yearText.text(year);
}
