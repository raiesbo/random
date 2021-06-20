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

console.log("testing")

// functions
let greetings: Function;
greetings = () => {
    console.log("hello world")
}
greetings();

const add = (a: number, b: number, c?: number | string): void => {
    console.log(a + b)
    console.log(c)
}

add(2, 3);
add(2, 3, "hi");


const minus = (a: number, b: number): number => {
    return a - b
}

let minusResult = minus(5, 6)

type StringOrNum = string | number;
type objWithName = {name: string, uid: StringOrNum}

const logDetails = (uid: StringOrNum, item: string): void => {
    console.log(`${item} has a uid of ${uid}`)
}

const greet = (user: objWithName) => {
    console.log(`${user.name} says hello`)
}

logDetails(888, "mario")
greet({name: "mario", uid: 58912})



////////////////////////
// function signatures

// let gretters: Function;

// example 1
let gree: (a: string, b: string) => void;

gree = (name: string, greeting: string) => {
    console.log(`${name} says ${greeting}`)
}

// example 2
let calc: (a: number, b: number, c: string) => number;

calc = (numOne: number, numTwo: number, action: string) => {
    if(action === 'add') {
        return numOne + numTwo;
    } else {
        return numOne - numTwo;
    }
}

// example 3
let logDets: (obj: {name: string; age: number}) => void;

type person = {name: string, age: number}

logDets = (ninja: {name: string, age: number}) => {
    console.log(`${ninja.name} id ${ninja.age} years old`)
}