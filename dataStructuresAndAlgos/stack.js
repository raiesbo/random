class Stack {
    constructor(arr = []) {
        this.list = arr
    }

    push = element => {
        this.list.push(element)
    }

    pop = () => {
        return this.list.pop()
    }

    clear = () => {
        this.list = []
    }

    size = () => {
        return this.list.length
    }

    print = () => {
        console.log(this.list.toString)
    }

}


module.exports = Stack;