class Queue {
    constructor(arr = []) {
        this.list = arr;
    }
    enqueue = element => {
        this.list.push(element);
    }
    dequeue = () => {
        this.list.shift();
    }
    clear = () => {
        this.list = []
    }
    print = () => {
        console.log(this.list.toString)
        return this.list.toString
    }
}

module.exports = Queue;