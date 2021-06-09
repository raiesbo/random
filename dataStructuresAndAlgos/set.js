class Set {
    constructor() {
        this.items = {};
    }
    add = item => {
        if (!this.items[item]) {
            this.items[item] = item
        }
    }
    delete = item => {
        if (this.items[item]) {
            delete this.items[item]
            return true
        }
        return false
    }
    has = item => {
        return this.items.hasOwnProperty(item)
    }
    size = () => {
        return Object.keys(this.items).length
    }
    values = () => {

    }
}

module.exports = Set;