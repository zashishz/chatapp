var uuid = require('node-uuid');
var _ = require('lodash');
var rooms = require('./data/rooms.json');
var express = require("express");

//router
var router = express.Router();
module.exports = router;

router.get("/rooms", (request, response) => {
    response.render("rooms", {
        title: "Rooms",
        rooms: rooms
    });
});

router.route("/rooms/add")
    .get((request, response) => {
        response.render("add");
    })
    .post((request, response) => {
        room = {
            name: request.body.name,
            id: uuid.v4()
        }
        rooms.push(room);
        response.redirect(request.baseUrl + '/rooms');
    });

router.get('/rooms/delete/:id', (request, response) => {
    rooms = rooms.filter(val => val.id !== request.params.id);
    response.redirect(request.baseUrl + '/rooms');
});

router.route('/rooms/edit/:id')
    .all(function(request, response, next){
        let id = request.params.id;
        var room = _.find(rooms, r => r.id === id);
        if (!room) {
            response.sendStatus(404);
        }
        response.locals.room = room;
        next();
    })
    .get((request, response) => {
        response.render('edit');
    })
    .post((request, response) => {

        response.locals.room.name = request.body.name;
        response.redirect(request.baseUrl + '/rooms');
    });