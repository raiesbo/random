const subtract = require('./subtract');

test('properly subtracting two numbers', () => {
    expect(subtract(2,1)).toBe(1);
})