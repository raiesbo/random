"use strict";
var anchor = document.querySelector('a');
// if(anchor) {
//     console.log(anchor.href)
// }
// console.log(anchor.href)
// console.log(anchor)
var form = document.querySelector('.new-item-form');
// console.log(form.children)
// input
var type = document.querySelector('#type');
var tofrom = document.querySelector('#tofrom');
var details = document.querySelector('#details');
var amount = document.querySelector('#amount');
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(type.value);
    console.log(tofrom.value);
    console.log(details.value);
    console.log(amount.value);
});
