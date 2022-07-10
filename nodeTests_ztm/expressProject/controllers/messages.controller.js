const path = require('path');

function getMessages(req, res) {
    // res.send('<ul><li>Alber Einstein</li></ul>')
    const absolutePath = path.join(__dirname, '..', 'public/images', 'skimountain.jpg')
    res.sendFile(absolutePath)
}

function postMessage(req, res) {
    console.log('Updating messages...')
}

module.exports = {
    getMessages,
    postMessage
}