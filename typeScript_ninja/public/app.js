import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
let docOne;
let docTwo;
docOne = new Invoice('yoshi', 'web work', 250);
docTwo = new Payment('mario', 'plumbing work', 300);
let docs = [];
docs.push(docOne);
docs.push(docTwo);
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
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    console.log(doc);
});
