import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";

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

const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul = document.querySelector('ul') as HTMLUListElement;
const list = new ListTemplate(ul);

form.addEventListener("submit", (event): void => {
    event.preventDefault();

    let doc: HasFormatter;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber)
        list.render(doc, type.value, 'end')
    } else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber)
        list.render(doc, type.value, 'start')
    }
    console.log(doc)
})

// ENUMS

enum ResourceType { BOOK, AUTHOR, FILM, DIRECTOR, PERSON }

// generics

const addUID = <T extends {name: string}>(obj: T) => {
    let uid = Math.floor(Math.random() * 100)
    return {...obj, uid} 
}

let docOne = addUID({name: 'yoshi', age: 40});

console.log(docOne.name)

// with interfaces
interface Resource<T> {
    uid: number;
    resourceName: ResourceType;
    data: T;
}

const docThree: Resource<string> = {
    uid: 1,
    resourceName: ResourceType.PERSON,
    data: 'trol'
}

// TUPLES

let arr = ['ryu', 25, true];
arr[0] = 10;
arr[1] = 'yoshi';

let tup: [string, number, boolean] = ['ryu', 25, true]
// tup[1] = "hi" // shows an error, in that position can not be a string.
let student: [string, number];
// student = [3, 'chun li'] // error, not the correct order of string/number
student = ['chun li', 2]

