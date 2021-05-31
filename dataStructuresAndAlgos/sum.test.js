const sum = require('./sum.js')

test('adds two numbers', () => {
    expect(sum(1, 2)).toEqual(3);
});