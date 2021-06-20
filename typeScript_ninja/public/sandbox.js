"use strict";
// let character: string = "mario";
// let age: number = 30;
// let isBlackBelt: boolean = false;
// // age = "hi"
// age = 23;
// isBlackBelt = true;
// console.log(character)
// const inputs = document.querySelectorAll('input');
// console.log(inputs)
// inputs.forEach(input => {
//     console.log(input)
// })
// // let age:number = 30;
// const circle = (diameter:number) => {
//     return diameter * Math.PI
// }
// console.log(circle(5))
// // arrays
// let names = ['luigi', 'mario', 'yoshi']
// names.push('toad')
// // names.push(3) // ERROR, only let you add strings
// let numbers = [1,5,7]
// numbers.push(4)
// let mixed:any = [1, "mario"] // if we declare at the start, it will be accepted
// let mixed2 = [1, "mario", true]
// // mixed2.push(true)
// mixed.push(true)
// //////////
// // objects
// let ninja = {
//     name: "mario",
//     belt: 'black',
//     age: 30
// }
// ///////////////////
// // ninja.age = "hi"
// ninja.age = 35;
// ninja = {
//     name: "",
//     belt: "",
//     age: 0
// }
// // ninja.skills = ["hi"]
// ///////////
// // explicit types
// let characterName: string;
// let characterAge: number;
// let isLoggedIn: boolean;
// characterAge = 50;
// isLoggedIn = true;
// let ninjas: string[] = [];
// // ninjas.push(45)
// ninjas.push("hi")
// // union types
// let mixedArr: (string|number|boolean)[] = [];
// mixedArr.push(3)
// mixedArr.push('hi')
// mixedArr.push(true)
// console.log(mixedArr)
// let uid: string|number;
// uid = "123"
// uid = 123
// // object
// let ninjaOne: Object;
// ninjaOne = {
//     name:'yoshiOne',
//     age: 30
// }
// console.log(ninjaOne["name"])
// // ninjaOne.name = "hi"
// let ninjaTwo: {
//     name: string,
//     age: number,
//     beltColour: string
// }
// ninjaTwo = {name: "mario", age: 20, beltColour: 'black'}
// console.log(ninjaTwo.name)
// let ninjaThree: {name: any, age: any}
// ninjaThree.name = "mario"
// ninjaThree.name = 4
// console.log(ninjaThree.name)
console.log("testing");
// functions
var greetings;
greetings = function () {
    console.log("hello world");
};
greetings();
var add = function (a, b, c) {
    console.log(a + b);
    console.log(c);
};
add(2, 3);
add(2, 3, "hi");
var minus = function (a, b) {
    return a - b;
};
var minusResult = minus(5, 6);
var logDetails = function (uid, item) {
    console.log(item + " has a uid of " + uid);
};
var greet = function (user) {
    console.log(user.name + " says hello");
};
logDetails(888, "mario");
greet({ name: "mario", uid: 58912 });
////////////////////////
// function signatures
// let gretters: Function;
// example 1
var gree;
gree = function (name, greeting) {
    console.log(name + " says " + greeting);
};
// example 2
var calc;
calc = function (numOne, numTwo, action) {
    if (action === 'add') {
        return numOne + numTwo;
    }
    else {
        return numOne - numTwo;
    }
};
// example 3
var logDets;
logDets = function (ninja) {
    console.log(ninja.name + " id " + ninja.age + " years old");
};
