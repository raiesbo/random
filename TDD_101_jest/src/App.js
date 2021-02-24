export const hello = () => {
    return "Hello"
}

export const add = (x, y) => {
    if (typeof x !== 'number' || typeof y !== 'number') return null
    return x + y
}

// TDD
// 1- we plan the function
// 2- we write the tests
// 3- we write the functions to pass the tests

export const removeSNames = arr => {
    return arr.filter(item => item[0].toLowerCase() !== 's');
}