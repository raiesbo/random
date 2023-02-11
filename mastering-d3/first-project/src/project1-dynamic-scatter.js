/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

let flag = true;

// Create SVG
const MARGIN = { TOP: 10, RIGHT: 100, BOTTOM: 130, LEFT: 100 };
const HEIGHT = 400;
const WIDTH = 600;

const clearHeight = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;
const clearWidth = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;

const svg = d3.select('#chart-area').append('svg')
    .attr('height', HEIGHT)
    .attr('width', WIDTH);

const g = svg.append('g')
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X Axis Label
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', clearWidth / 2)
    .attr('y', clearHeight + 60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text("Months");

// Y Axis Label
const yLabel = g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', - (clearHeight / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text("Revenue");

const x = d3.scaleBand()
    // .domain(cleanData.map(entry => entry.month))
    .range([0, clearWidth])
    .paddingInner(0.3)
    .paddingOuter(0.2);

const y = d3.scaleLinear()
    // .domain([0, d3.max(data, d => d.revenue)])
    .range([clearHeight, 0]);


const xAxisGroup = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${clearHeight})`);

const yAxisGroup = g.append('g')
    .attr('class', 'y axis')

d3.csv('../data/revenues.csv').then(data => {
    const cleanData = data.map(entry => ({ ...entry, revenue: Number(entry.revenue), profit: Number(entry.profit) }));

    d3.interval(() => {
        flag = !flag;
        // Removing one column to see the resultof .exit().remove()
        const updatedData = flag ? cleanData : cleanData.slice(1);
        udpate(updatedData);
    }, 1000)

    // First run of the loop
    udpate(cleanData);
})

const udpate = (data) => {
    const value = flag ? 'profit' : 'revenue';

    const t = d3.transition().duration(750);

    // Scales
    x.domain(data.map(entry => entry.month));
    y.domain([0, d3.max(data, d => d[value])])

    // Axis
    const xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall)
        .selectAll('text') // Bottom Axis Text
        .attr('y', 10)
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)');

    const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + "m");
    yAxisGroup.transition(t).call(yAxisCall);

    // DATA JOIN. Join new data with old elements
    const circles = g.selectAll('circle')
        .data(data, d => d.month); // to make sure the data is tracked in the right way

    // EXIT old elements not present in new data
    circles.exit()
        .attr('fill', 'red')
        .transition(t)
        // .attr('height', 0)
        .attr('cy', y(0))
        .remove();

    // ENTER new elements present in new data
    circles.enter().append('circle')
        .data(data)
        .attr("r", 5)
        .attr("fill", "grey")
        .attr('cy', y(0))
        // UPDATE old elements present in new data
        .merge(circles)
        .transition(t)
        .attr("cx", d => x(d.month) + (x.bandwidth() / 2))
        .attr("cy", d => y(d[value]))

    const text = flag ? 'Profit (€)' : 'Revenue (€)';
    yLabel.text(text)
}