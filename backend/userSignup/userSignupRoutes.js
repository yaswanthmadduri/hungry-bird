var express = require('express');
var signupRouter = express.Router();

const userSignupController = require('../userSignup/userSignupController');

//Posting new user signup data to db.
signupRouter.post('/signup', userSignupController.userSignup);

//Exporting router module.
module.exports = signupRouter;