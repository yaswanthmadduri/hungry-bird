var express = require('express');
var userInfoRouter = express.Router();
const _ = require('lodash');
const multer = require('multer');

const jwtHelper = require('../config/jwtHelper');
const userInformationController = require('../userInformation/userInfoController');



//////////////USER PROFILE PIC/////////////

const userProfilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/userProfilePics');
    },
    filename: function (req, file, cb) {
        let randomSequence = Math.random().toString(36).substring(8);
        cb(null, file.fieldname + randomSequence + file.originalname);
    }
});

const userProfilePicTypeFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
        console.log("Pic uploaded");
    } else {
        cb(null, false);
    }
};


const uploadProfilePic = multer({
    storage: userProfilePicStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: userProfilePicTypeFilter
});



//Getting all the user info from the db.
userInfoRouter.get('/allusers', userInformationController.getAllUsers);

//update profile picture in database
userInfoRouter.put('/updateProfilePicture/:userEmailId', jwtHelper.verifyJwtToken, uploadProfilePic.single('profilePicture'), userInformationController.updateProfilePic);

//get that updated profile picture
userInfoRouter.get('/getprofilepic/:userEmailId', jwtHelper.verifyJwtToken, userInformationController.getProfilePic);

// delete a user account
userInfoRouter.delete('/deleteaccount/:userEmailId', jwtHelper.verifyJwtToken, userInformationController.deleteUserAccount);



//Exporting router module.
module.exports = userInfoRouter;