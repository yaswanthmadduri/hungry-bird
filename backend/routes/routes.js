var express = require('express');
var router = express.Router();

const foodItem = require('../model/fooditem');
const userInfo = require('../model/userinfo');







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
router.post('/restaurant/add-item-to-list', (req, res, next) => {
    let newFoodItem = new foodItem({
        itemName: req.body.itemName,
        itemQuantityAvailable: req.body.itemQuantityAvailable,
        itemQuantityBought: req.body.itemQuantityBought
    });

    newFoodItem.save((err, newitem) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ message: "Item has been added to the available list" });
        }
    });
});


//update food-item availability in the restuarant in database
router.put('/restaurant/food-item-list/:itemName', (req, res, next) => {

    foodItem.findOneAndUpdate({ "itemName": req.params.itemName }, {
        $set: {
            itemQuantityAvailable: req.body.itemQuantityAvailable,
            itemQuantityBought: req.body.itemQuantityBought
        },
        function(err, res) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ res: "item info updated" });
            }

        }
    })

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
    newuserInfo.userPassword = req.body.userPassword,
    newuserInfo.userName = req.body.userName,
    newuserInfo.userPhoneNumber = req.body.userPhoneNumber,
    newuserInfo.termsAccepted = req.body.termsAccepted,
    newuserInfo.signedUp = true,

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

//update user password in database
router.put('/user-info/change-password/:userEmailId', (req, res, next) => {
    userInfo.findOneAndUpdate(
        { "userEmailId": req.params.userEmailId },
        {
            $set: {
                userPassword: req.body.userPassword,
            }
        }
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(users);
            }
        });


});

// delete a user account
router.delete('/user-info/delete-account/:userEmailId', (req, res, next) => {
    userInfo.findOneAndDelete(
        { "userEmailId": req.params.userEmailId }
        , function (err, users) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(users);
            }
        });
});

//Exporting router module.

module.exports = router;