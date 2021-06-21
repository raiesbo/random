import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";

let docOne: HasFormatter;
let docTwo: HasFormatter;

docOne = new Invoice('yoshi', 'web work', 250)
docTwo = new Payment('mario', 'plumbing work', 300)

let docs: HasFormatter[] = [];
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

const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

form.addEventListener("submit", (event): void => {
    event.preventDefault();

    let doc: HasFormatter;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber)
    } else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber)
    }
    console.log(doc)
})