var express = require('express');
var restaurantRouter = express.Router();
const _ = require('lodash');
const multer = require('multer');
const jwtHelper = require('../config/jwtHelper');
const restaurantController = require('./restaurantController')



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

// THE MAIN FUNCTION FOR PIC UPLOAD
const uploadFoodImages = multer({
    storage: foodImagesStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: foodImageUploadFileFilter
});





// retrieving food available at the restaurant from database
restaurantRouter.get('/availablefooditems', restaurantController.getAllItems);

// posting new food in the restaurant to database
restaurantRouter.post('/additemtolist', jwtHelper.verifyJwtToken, uploadFoodImages.single('productImage'), restaurantController.addItemstoRestaurant);

//update food-item availability in the restuarant in database

restaurantRouter.put('/editfooditem/:itemName', restaurantController.editItem);

/// delete item from itemlist
restaurantRouter.delete('/deletefooditem', restaurantController.deleteItem);


//Exporting router module.
module.exports = restaurantRouter;