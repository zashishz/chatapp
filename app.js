var express = require("express");
var bodyParser = require('body-parser');

var app = express();
//set
app.set('view engine','jade')
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request,response)=>{
    response.render("index",{title:"Home"});
});

var adminRouter = require('./admin');
app.use(adminRouter);

app.listen(3000,()=>{
    console.log("Chat app is listening on port 3000");
})