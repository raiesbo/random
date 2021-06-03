const Stack = require('./stack');

test('instanciates a class with and without default list elementos', () => {
    const newStack = new Stack([1, 2, 3])
    expect(newStack.list).toEqual([1, 2, 3])
    const newStack2 = new Stack()
    expect(newStack2.list).toEqual([])
})

test("it is possible to add element at the top of the stack", () => {
    const newStack = new Stack()
    newStack.push(1)
    newStack.push(2)
    expect(newStack.list).toEqual([1, 2])
})

test("it is possible to pop the last element", () => {
    const newStack = new Stack()
    newStack.push(1)
    newStack.push(2)
    expect(newStack.pop()).toEqual(2)
    expect(newStack.list).toEqual([1])
})

test('clear method empties the list', () => {
    const newStack = new Stack([1, 2, 3])
    newStack.clear()
    expect(newStack.list).toEqual([])
})