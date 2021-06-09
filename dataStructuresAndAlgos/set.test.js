const Set = require("./set");


describe('general Set data structure tests', () => {
    test('instancites with empty object', () => {
        const newSet = new Set();
        expect(newSet.items).toEqual({})
    })
    test('adds new and unic values to the set', () => {
        const newSet = new Set();
        newSet.add(1)
        expect(newSet.items).toEqual({ 1: 1 })
        newSet.add(1)
        expect(newSet.items).toEqual({ 1: 1 })
        newSet.add(2)
        expect(newSet.items).toEqual({ 1: 1, 2: 2 })
    })
})