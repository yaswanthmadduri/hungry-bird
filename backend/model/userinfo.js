const mongoose = require('mongoose');

const userSignupSchema = mongoose.Schema({

    userEmailId: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPhoneNumber: {
        type: Number,
        required: true
    },

    termsAccepted:{
        type: Boolean,
        required: true
    }
});

const userSchema = module.exports = mongoose.model('userinfo', userSignupSchema);