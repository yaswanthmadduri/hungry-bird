var express = require('express');
var router = express.Router();

const foodItem = require('../model/fooditem');
const userInfo = require('../model/userinfo');
const foodInCart = require('../model/foodincart');


const passport = require('passport');

const jwtHelper = require('../config/jwtHelper');

const _ = require('lodash');
const mongoose = require("mongoose");
const multer = require('multer');


const e = require('express');
const pictureLink = "";
const userSignupController = require('../userSignup/userSignupController');
const restaurantController = require('../restaurantItems/restaurantController');
const userInformationController = require('../userInformation/userInfoController');
const userCartController = require('../userCart/userCartController');






///////////////////////////////////////////////////////////// USER AUTH ///////////////////////////////////////////////////////////////

// authenticating the user to log in. i dont know clearly
router.post('/authenticate', (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);

});


// checking if user is authenticated

router.get('/user-profile', jwtHelper.verifyJwtToken, (req, res, next) => {
    userInfo.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['userName', 'email', 'password', 'userPhoneNumber']) });
        }
    );
});



//Exporting router module.

module.exports = router;





























































































/* /////////////////////////// RESTAURANT FOOD PICS//////////////////////////


const foodImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/foodPicsforRestaurant');
    },
    filename: function (req, file, cb) {
        let randomSequence = Math.random().toString(36).substring(8);
        cb(null, file.fieldname + randomSequence + file.originalname);
    }
});
const foodImageUploadFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
        console.log("Uploaded");
    } else {
        cb(null, false);
    }
};

// THE MAIN FUNCTION
const uploadFoodImages = multer({
    storage: foodImagesStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: foodImageUploadFileFilter
});
 */

//////////////USER PROFILE PIC/////////////

/* const userProfilePicStorage = multer.diskStorage({
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
}); */

/////////////////////////////////////////////////////////// RESTAURANT DATA ////////////////////////////////////////////////////////////////

/* 
// retrieving food available at the restaurant from database
router.get('/restaurant/available-food-items', restaurantController.getAllItems);

// posting new food in the restaurant to database
router.post('/restaurant/add-item-to-list', jwtHelper.verifyJwtToken, uploadFoodImages.single('productImage'), restaurantController.addItemstoRestaurant);

//update food-item availability in the restuarant in database

router.put('/restaurant/food-item-list/:itemName', restaurantController.editItem);

/// delete item from itemlist
router.delete('/restaurant/food-item-list/delete-item', restaurantController.deleteItem); */

////////////// //////////////////////////////////////// USER INFORMATION /////////////////////// //////////////////////////////////////////
/* 
//Posting new user signup data to db.
router.post('/user-signup', userSignupController.userSignup);

//Getting all the user info from the db.
router.get('/all-user-data', userInformationController.getAllUsers);

//update profile picture in database
router.put('/user-info/update-profile-picture/:userEmailId', jwtHelper.verifyJwtToken, uploadProfilePic.single('profilePicture'), userInformationController.getProfilePic);

//get that updated profile picture
router.get('/user-info/get-profile-pic/:userEmailId', jwtHelper.verifyJwtToken, userInformationController.getProfilePic);

// delete a user account
router.delete('/user-info/delete-account/:userEmailId', jwtHelper.verifyJwtToken, userInformationController.deleteUserAccount);

 */

/* ////////////////////////////////////////////////////////// cart  ///////////////////////////////////////////////////////////////////////////

//get the cart items
router.get('/user-info/get-cart/:userEmailId', jwtHelper.verifyJwtToken, userCartController.getCartItems);


///// delete item from cart
router.put('/user/deletefromcart/:userEmailId', jwtHelper.verifyJwtToken, userCartController.deleteItemFromCart);

///// increase quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"
router.put('/user/increasequantity/:userEmailId', jwtHelper.verifyJwtToken, userCartController.increaseItemQuantity);


///// decrease quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"/////
router.put('/user/decreasequantity/:userEmailId', jwtHelper.verifyJwtToken, userCartController.decreaseItemQuantity);

// posting data to cart. we have to pass the verification jwt token as well
router.put('/user/:userEmailId/addtocart', jwtHelper.verifyJwtToken, userCartController.addItemToCart);

 */

