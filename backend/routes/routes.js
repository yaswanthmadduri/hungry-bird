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


const mongo = require('../mongo');
const e = require('express');
const pictureLink = "";

/////////////////////////// restaurant food pics//////////////////////////


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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
        console.log("Uploaded");
    } else {
        cb(null, false);
    }
};
const uploadFoodImages = multer({
    storage: foodImagesStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: foodImageUploadFileFilter
});


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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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

////////////////// RESTAURANT DATA/////////////////////////



// retrieving food available at the restaurant from database
router.get('/restaurant/available-food-items', (req, res, next) => {
    foodItem.find(function (err, items) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(items);
        }
    })
});

// posting new food in the restaurant to database
router.post('/restaurant/add-item-to-list', jwtHelper.verifyJwtToken, uploadFoodImages.single('productImage'), (req, res, next) => {
    let newFoodItem = new foodItem();
    newFoodItem.itemName = req.body.itemName,
        newFoodItem.itemQuantityAvailable = req.body.itemQuantityAvailable,
        newFoodItem.itemQuantityBought = req.body.itemQuantityBought,
        newFoodItem.itemCost = req.body.itemCost,
        newFoodItem.itemType = req.body.itemType,
        newFoodItem.productImage = "http://localhost:3000/"+req.file.path

    newFoodItem.save((err, newitem) => {
        if (!err)
            res.send(newitem + "Item has been added to the available list");
        else {
            if (err.code == 11000)
                res.status(422).send([newFoodItem.itemName + ' already exists.']);
            else
                return next(err);
        }
    });
});


//update food-item availability in the restuarant in database
router.put('/restaurant/food-item-list/:itemName', (req, res, next) => {

    foodItem.findOneAndUpdate(
        { "itemName": req.params.itemName },
        {
            $set: {
                itemQuantityAvailable: req.body.itemQuantityAvailable
            }
        }
        , function (err, updateditem) {
            if (err) {
                res.json(err);
            }
            else {
                res.json("item updated");
            }
        });

});


router.delete('/restaurant/food-item-list/:itemName', (req, res, next) => {
    foodItem.findByIdAndDelete({ "itemName": req.params.itemName },
        function (err, res) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ res: "item deleted from list" });
            }

        });
});

////////////// USER INFORMATION //////////////////////////////////////////

//Posting new user signup data to db.
router.post('/user-signup', (req, res, next) => {
    let newuserInfo = new userInfo();
    newuserInfo.email = req.body.userEmailId,
        newuserInfo.password = req.body.userPassword,
        newuserInfo.userName = req.body.userName,
        newuserInfo.userPhoneNumber = req.body.userPhoneNumber,
        newuserInfo.termsAccepted = req.body.termsAccepted,
        newuserInfo.signedUp = true,
        newuserInfo.profilePicture = "",
        newuserInfo.cartItems = [];

    newuserInfo.save((err, newuser) => {
        if (!err)
            res.send(newuser);

        else {
            if (err.code == 11000)
                res.status(422).send(['Email address already exists.']);
            else
                return next(err);
        }
    });
});
//Getting all the user info from the db.

usersintheDB = router.get('/all-user-data', (req, res, next) => {

    userInfo.find(function (err, users) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(users);
        }
    })
});

//update profile picture in database
router.put('/user-info/update-profile-picture/:userEmailId', jwtHelper.verifyJwtToken, uploadProfilePic.single('profilePicture'), (req, res, next) => {
    userInfo.findOneAndUpdate(
        { "email": req.params.userEmailId },
        {
            $set: {
                profilePicture: req.file.path
            }
        }
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({message:"Success!"});
            }
        });


});

//get that updated profile picture
router.get('/user-info/get-profile-pic/:userEmailId', jwtHelper.verifyJwtToken, (req,res,next) => {
    userInfo.findOne({"email" : req.params.userEmailId},
    function (err,data){
        if(err){
            res.json(err)
        }
        else{
            res.json({"PictureLink" : data.profilePicture})
        }
    });
})


//get the cart items
router.get('/user-info/get-cart/:userEmailId', jwtHelper.verifyJwtToken, (req,res,next) => {
    userInfo.findOne({"email" : req.params.userEmailId},
    function (err,data){
        if(err){
            res.json(err)
        }
        else{
            res.json({"cartItems" : data.cartItems})
        }
    });
})


// delete a user account
router.delete('/user-info/delete-account/:userEmailId', jwtHelper.verifyJwtToken, (req, res, next) => {
    userInfo.findOneAndDelete(
        { "email": req.params.userEmailId }
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(users);
            }
        });
});

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


// displaying the logged in user info i dont knwo whats being done here. 

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








// retrieving data from cart
router.get('/user/cart/foodincart', jwtHelper.verifyJwtToken, (req, res, next) => {
    foodInCart.find(function (err, items) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(items);
        }
    })
});

/* // posting data to cart. we have to pass the verification jwt token as well
router.post('/user/cart/addtocart/:email', jwtHelper.verifyJwtToken, (req, res, next) => {
    let foodincart = new foodInCart();

    nameOfFoodRequested = foodItem.find({ "itemName": req.body.foodName }
        , function (err, existingItem) {

            if (existingItem.length > 0) {
                //console.log(existingItem); checks if its not returning an empty object array
                foodincart.foodName = req.body.foodName;
                foodincart.Quantity = req.body.Quantity;
                foodincart.totalCost = req.body.totalCost;
                foodincart.BoughtorNot = req.body.BoughtorNot;



                foodincart.save((err, newitem) => {
                    if (!err) {

                        res.send(newitem);

                    }

                    else {
                        if (err.code == 11000) {
                            a = updateQuantity(res, foodincart.foodName, foodincart.Quantity);
                            console.log(a)

                        }
                        else
                            return next(err);
                    }
                });



            }
            else {
                return res.json({ message: "Item doesnot exist" });
            }
        });

});

//updating quantity if item exists in cart
function updateQuantity(res, foodname, quantity) {

    foodInCart.findOneAndUpdate(
        { "foodName": foodname },
        {
            $set: {
                Quantity: quantity
            }
        }
        , function (err, response) {
            if (err) {
                console.log("err")
                return res.json(err);
            }
            else {
                return res.json({ message: "Updated quantity to " + quantity });
            }
        });
}
 */

//On BUYING the ITEMS finally
router.put('/user/cart/update/boughtornot', (req, res, next) => {
    userInfo.updateMany(
        {},
        {
            $set: {
                BoughtorNot: true
            },
        },
        {timestamps: true}
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(users);
            }
        });
});




//// cart implementation



///// delete item from cart
router.put('/user/:userEmailId/deletefromcart', jwtHelper.verifyJwtToken,(req, res, next) => {

        userInfo.findOneAndUpdate({ email: req.params.userEmailId },
            { $pull: { cartItems: { foodName: req.body.foodName } } },
            function (err, data) {
                if (err) res.send(err)
                else res.send(data)
            });

});

///// increase quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"
router.put('/user/:userEmailId/increasequantity',jwtHelper.verifyJwtToken, (req,res,next)=>{

    if (req.body.Quantity != 0 && req.body.Quantity >0) {
        
        userInfo.findOneAndUpdate(
            {
                email: req.params.userEmailId,
                "cartItems.foodName": req.body.foodName
            },
            {
                $inc: {"cartItems.$.Quantity": 1}
            },
            {
                "upsert": true
            },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            })

    }
    else{
        res.send("Quantity should be greater than 0")
    }
});



///// decrease quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"/////
router.put('/user/:userEmailId/decreasequantity',jwtHelper.verifyJwtToken, (req,res,next)=>{

    if (req.body.Quantity != 0 && req.body.Quantity >0) {
        
        userInfo.findOneAndUpdate(
            {
                email: req.params.userEmailId,
                "cartItems.foodName": req.body.foodName
            },
            {
                $inc: {"cartItems.$.Quantity": -1}
            },
            {
                "upsert": true
            },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            })

    }
    else{
        res.send("Quantity should be greater than 0")
    }
});

// posting data to cart. we have to pass the verification jwt token as well
router.put('/user/:userEmailId/addtocart',jwtHelper.verifyJwtToken, (req, res, next) => {

    userInfo.findOneAndUpdate(
        { "email": req.params.userEmailId },
        {
            $push: {
                cartItems: [
                    {
                        foodName: req.body.foodName,
                        Quantity: req.body.Quantity,
                    }
                ]
            }
        },
        { upsert: true }
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(users + "users");
            }

        });

})

//Exporting router module.

module.exports = router;