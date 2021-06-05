const Queue = require('./Queue');

test('We can instanciate Queue type with and without existing Queue', () => {
    const newQueue = new Queue();
    expect(newQueue.list).toEqual([]);
    const newQueue2 = new Queue([1, 2, 3]);
    expect(newQueue2.list).toEqual([1, 2, 3]);
})

test("Adding elemento at the end of the Queue", () => {
    const newQueue = new Queue();
    newQueue.enqueue(2)
    expect(newQueue.list).toEqual([2]);
})

test("Adding elemento at the end of the Queue", () => {
    const newQueue = new Queue([2, 3]);
    newQueue.dequeue()
    expect(newQueue.list).toEqual([3]);
})

test("Clearing a Queue", () => {
    const newQueue = new Queue([2, 3]);
    newQueue.clear()
    expect(newQueue.list).toEqual([]);
})