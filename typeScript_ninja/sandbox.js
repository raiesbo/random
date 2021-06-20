var character = "mario";
var age = 30;
var isBlackBelt = false;
// age = "hi"
age = 23;
isBlackBelt = true;
console.log(character);
var inputs = document.querySelectorAll('input');
console.log(inputs);
inputs.forEach(function (input) {
    console.log(input);
});
// let age:number = 30;
var circle = function (diameter) {
    return diameter * Math.PI;
};
console.log(circle(5));
// arrays
var names = ['luigi', 'mario', 'yoshi'];
names.push('toad');
// names.push(3) // ERROR, only let you add strings
var numbers = [1, 5, 7];
numbers.push(4);
var mixed = [1, "mario"]; // if we declare at the start, it will be accepted
var mixed2 = [1, "mario", true];
// mixed2.push(true)
mixed.push(true);
//////////
// objects
var ninja = {
    name: "mario",
    belt: 'black',
    age: 30
};
///////////////////
// ninja.age = "hi"
ninja.age = 35;
ninja = {
    name: "",
    belt: "",
    age: 0
};
// ninja.skills = ["hi"]
///////////
// explicit types
var characterName;
var characterAge;
var isLoggedIn;
characterAge = 50;
isLoggedIn = true;
var ninjas = [];
// ninjas.push(45)
ninjas.push("hi");
// union types
var mixedArr = [];
mixedArr.push(3);
mixedArr.push('hi');
mixedArr.push(true);
console.log(mixedArr);
var uid;
uid = "123";
uid = 123;
// object
var ninjaOne;
ninjaOne = {
    name: 'yoshiOne',
    age: 30
};
console.log(ninjaOne["name"]);
// ninjaOne.name = "hi"
var ninjaTwo;
ninjaTwo = { name: "mario", age: 20, beltColour: 'black' };
console.log(ninjaTwo.name);
