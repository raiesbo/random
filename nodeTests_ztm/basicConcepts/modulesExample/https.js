// const { send } = require('./request');
// const response = require('./response');
import { read } from './response.js'; // ECMAScript 6 modules
import { send } from './request.js';

function makeRequest(url, data) {
    send(url, data);
    return read();
}


const resData = makeRequest('https//:www.google.com', 'HELLO');
console.log(resData);

// place where node modules are cashed in order
// to avoid imported the same module multiple times
// console.log(require.cache);