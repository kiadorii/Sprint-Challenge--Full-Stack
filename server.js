const bodyParser = require('body-parser');
const express =require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', function(req, res) {
    const newUser = newUser(req.body);

    newUser.save(function(err, user) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({error: 'error message for server.post()'});
        } else {
            res.status(200).json(user);
        }
    });
});

server.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "error get does not work"});
        } else {
            res.status(200).json(users);
        }
    })
});

server.delete('/users/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, users) {
        if (err) {
            res.status(STATUS_USER_ERROR).json({ error: "error in delete"});
        } else {
            res.status(200).json(users);
        }
    });
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://localhost/servers',
    { useMongoClient: true }
);

connect.then(() => {
    const port = 3000;
    server.listen(port);
    console.log('Server Listening on ${port}');
}, (err) => {
    console.log('\n**************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('**************************\n');
});