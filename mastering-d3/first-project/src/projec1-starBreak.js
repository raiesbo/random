/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/


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
g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', - (clearHeight / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text("Revenue");

d3.csv('../data/revenues.csv').then(data => {
    const cleanData = data.map(entry => ({ ...entry, revenue: Number(entry.revenue), profit: Number(entry.profit) }));

    // Scales
    const x = d3.scaleBand()
        .domain(cleanData.map(entry => entry.month))
        .range([0, clearWidth])
        .paddingInner(0.3)
        .paddingOuter(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .range([clearHeight, 0]);

    const xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${clearHeight})`)
        .call(xAxisCall)
        .selectAll('text') // Bottom Axis Text
        .attr('y', 10)
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)');

    const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + "m");
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxisCall);

    const rects = g.selectAll('rect').data(cleanData);

    rects.enter().append('rect').data(cleanData)
        .attr("y", d => y(d.revenue))
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => clearHeight - y(d.revenue))
        .attr("fill", "grey");
})
