var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
require('./config/config');
require('./config/passportconfig');

//instantiating the express
var app = express();

//instantiating passport
const passport = require('passport');


//importing the routes.js file, so that, all routes are transferred to it.
const route = require('./routes/routes');
const signupRouter = require('./userSignup/userSignupRoutes');
const userInfoRouter = require("./userInformation/userInfoRoutes");
const restaurantRouter = require("./restaurantItems/restaurantRoutes");
const cartRouter = require('./userCart/userCartRoutes');


//connecting to mongodb
const connectionString = "mongodb://localhost:27017/hungrybird"
//const connectionString = "mongodb+srv://yaswanth:tknIDZPoWYFgz3Xr@hungrybirdcluster.fokxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionString,{ useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//on connection to mongodb
mongoose.connection.on('connected', ()=>{
    console.log("Connected to Mongo DataBase Compass");
});

//on error in connecting to mongodb
mongoose.connection.on('error', (err)=>{
    console.log(err);
});



// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});



//middleware adding - cors

app.use(cors());

//middleware adding - body-parser.json

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(passport.initialize());

// making upload folder public (Making it usable by angular to display to frontent)
app.use('/uploads', express.static('uploads'));


//changing the route scope to routes.js

app.use('/api/', route);
app.use('/usersignup/api/', signupRouter);
app.use('/userinfo/api/', userInfoRouter);
app.use('/restaurant/api/', restaurantRouter);
app.use('/cart/api/', cartRouter);

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('getting this data for /')
})

app.listen(PORT, ()=>{
    console.log('server has been started on port: '+ PORT);
})