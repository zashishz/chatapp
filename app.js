var express = require("express");
var rooms = require('./data/rooms.json');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var _ = require('lodash');

var app = express();
//set
app.set('view engine','jade')
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request,response)=>{
    response.render("index",{title:"Home"});
});

app.get("/admin/rooms", (request,response)=>{
    response.render("rooms",{
        title:"Rooms",
        rooms: rooms
    });
});

app.get("/admin/rooms/add", (request,response)=>{
    response.render("add");
});

app.post("/admin/rooms/add", (request,response)=>{
    room = {
        name: request.body.name,
        id: uuid.v4()
    }
    rooms.push(room);
    response.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', (request,response)=>{
    rooms = rooms.filter(val => val.id !== request.params.id);
    response.redirect('/admin/rooms');
});

app.get('/admin/rooms/edit/:id', (request,response)=>{
    var room = _.find(rooms, r=> r.id === request.params.id);
    if(!room) {
        response.sendStatus(404);
    }
    response.render('edit',{room});
});

app.post("/admin/rooms/edit/:id", (request,response)=>{
    
    id= request.params.id;

    var room = _.find(rooms,r=> r.id === id);

    if(!room) {
        response.sendStatus(404);
    }
    
    room.name = request.body.name;
    response.redirect('/admin/rooms');
});

app.listen(3000,()=>{
    console.log("Chat app is listening on port 3000");
})