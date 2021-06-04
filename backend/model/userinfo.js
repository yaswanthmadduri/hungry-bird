const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('../config/passportconfig');

const foodinCartSchema = mongoose.Schema({
    itemName:{
        type:String,
        required: true
    },
    itemQuantity:{
        type: Number,
        required: true
    },
    itemCost:{
        type: Number,
        required : true
    },
    itemType:{
        type: String,
        required: true

    },
    productImage:{
        type: String,
        required: true
    },
    _id:{
        type: String,
        required: true
    }
});

const userSignupSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [6, 'Password cannot be less than 6 letters'],
        maxlength: [20, 'Password cannot be more than 20 letters']
    },
    userName: {
        type: String,
        required: true,
        minlength: [4, 'Name cannot be less than 4 letters'],
        maxlength: [15, 'Name cannot be more than 20 letters']
    },
    userPhoneNumber: {
        type: Number,
        required: true,
        min: [1000000000, 'Enter a valid number'],
        max: [9999999999, 'Enter a valid number']
    },

    termsAccepted: {
        type: Boolean,
        required: true

    },
    signedUp: {
        type: Boolean
    },
    saltSecret: {
        type: String
    },
    profilePicture: { type: String },
    cartItems: [foodinCartSchema]
});





// Custom validation for email
userSignupSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// Custom validation for phone number
userSignupSchema.path('userPhoneNumber').validate((val) => {
    phnumRegex = /^\d{10}$/;
    return phnumRegex.test(val);
}, 'Invalid Phone number.');


// Event for encrypting password before saving the user data
userSignupSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt; // necessary for decryption of hash
            next();
        });
    });
});


// Methods for password and token gen
userSignupSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password); // checking if passwords match
}

userSignupSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET, // encrypting with the mentioned jwt secret in config.json
    {
        expiresIn: process.env.JWT_EXP //expiration time of token
    });
}



const userSchema = module.exports = mongoose.model('userSchema', userSignupSchema);