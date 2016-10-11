var uuid = require('node-uuid');
var _ = require('lodash');
var rooms = require('./data/rooms.json');
var express = require("express");

//router
var router = express.Router();
module.exports = router;

router.get("/admin/rooms", (request,response)=>{
    response.render("rooms",{
        title:"Rooms",
        rooms: rooms
    });
});

router.get("/admin/rooms/add", (request,response)=>{
    response.render("add");
});

router.post("/admin/rooms/add", (request,response)=>{
    room = {
        name: request.body.name,
        id: uuid.v4()
    }
    rooms.push(room);
    response.redirect('/admin/rooms');
});

router.get('/admin/rooms/delete/:id', (request,response)=>{
    rooms = rooms.filter(val => val.id !== request.params.id);
    response.redirect('/admin/rooms');
});

router.get('/admin/rooms/edit/:id', (request,response)=>{
    var room = _.find(rooms, r=> r.id === request.params.id);
    if(!room) {
        response.sendStatus(404);
    }
    response.render('edit',{room});
});

router.post("/admin/rooms/edit/:id", (request,response)=>{
    
    id= request.params.id;

    var room = _.find(rooms,r=> r.id === id);

    if(!room) {
        response.sendStatus(404);
    }
    
    room.name = request.body.name;
    response.redirect('/admin/rooms');
});