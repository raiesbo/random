import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { ListTemplate } from "./classes/ListTemplate.js";
// let docOne: HasFormatter;
// let docTwo: HasFormatter;
// docOne = new Invoice('yoshi', 'web work', 250)
// docTwo = new Payment('mario', 'plumbing work', 300)
// let docs: HasFormatter[] = [];
// docs.push(docOne);
// docs.push(docTwo);
// const invOne = new Invoice("Mario", "work on the mario website", 250);
// const invTwo = new Invoice("Luigi", "work on the mario website", 300);
// let invoices: Invoice[] = [];
// invoices.push(invOne)
// invoices.push(invTwo)
// console.log(invOne, invTwo)
// console.log(invoices)
// console.log(invOne.format())
const form = document.querySelector('.new-item-form');
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
        list.render(doc, type.value, 'end');
    }
    else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
        list.render(doc, type.value, 'start');
    }
    console.log(doc);
});
// ENUMS
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["BOOK"] = 0] = "BOOK";
    ResourceType[ResourceType["AUTHOR"] = 1] = "AUTHOR";
    ResourceType[ResourceType["FILM"] = 2] = "FILM";
    ResourceType[ResourceType["DIRECTOR"] = 3] = "DIRECTOR";
    ResourceType[ResourceType["PERSON"] = 4] = "PERSON";
})(ResourceType || (ResourceType = {}));
// generics
const addUID = (obj) => {
    let uid = Math.floor(Math.random() * 100);
    return Object.assign(Object.assign({}, obj), { uid });
};
let docOne = addUID({ name: 'yoshi', age: 40 });
console.log(docOne.name);
const docThree = {
    uid: 1,
    resourceName: ResourceType.PERSON,
    data: 'trol'
};
// TUPLES
let arr = ['ryu', 25, true];
arr[0] = 10;
arr[1] = 'yoshi';
let tup = ['ryu', 25, true];
// tup[1] = "hi" // shows an error, in that position can not be a string.
let student;
// student = [3, 'chun li'] // error, not the correct order of string/number
student = ['chun li', 2];
