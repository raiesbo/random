const model = require('../models/friends.model');

function getFriends(req, res) {
    res.json(model);
}

function getFriend(req, res) {
    const id = Number(req.params.friendId);
    const friend = model[id];
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).json({
            error: "Friend does not existç"
        });
    }
}


function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        });
    };

    const newFriend = {
        name: req.body.name,
        id: model.length
    };

    model.push(newFriend);

    res.send(newFriend);
}



module.exports = {
    getFriends,
    getFriend,
    postFriend
}