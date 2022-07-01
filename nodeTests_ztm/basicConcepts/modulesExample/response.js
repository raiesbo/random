function descrypt(data) {
    return 'decrypted data';
}

function read() {
    return descrypt('data');
}

// This way of exporting modules is better
// The module interface is more clear
// module.exports = {
//     read
// };

export {
    read
}