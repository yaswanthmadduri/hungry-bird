var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");


//instantiating the express
var app = express();


//importing the route.js file, so that, all routes are transferred to it.
const route = require('./routes/routes');

//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/hungrybird');

//on connection to mongodb
mongoose.connection.on('connected', ()=>{
    console.log("Mongodb connected on port 27017");
});

//on error in connecting to mongodb
mongoose.connection.on('error', (err)=>{
    console.log(err);
});

//middleware adding - cors

app.use(cors());

//middleware adding - body-parser.json

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



//changing the route scope to routes.js

app.use('/api', route)

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('getting this data for /')
})
app.listen(PORT, ()=>{
    console.log('server has been started on port: '+ PORT);
})