var express = require('express');
var cartRouter = express.Router();
const jwtHelper = require('../config/jwtHelper');

const userCartController = require('./userCartController');


//get the cart items
cartRouter.get('/getcart/:userEmailId', jwtHelper.verifyJwtToken, userCartController.getCartItems);


///// delete item from cart
cartRouter.put('/deletefromcart/:userEmailId', jwtHelper.verifyJwtToken, userCartController.deleteItemFromCart);

///// increase quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"
cartRouter.put('/increasequantity/:userEmailId', jwtHelper.verifyJwtToken, userCartController.increaseItemQuantity);


///// decrease quantity by 1, provide item details in the body ex.  "foodName":"Chicken Biriyani"/////
cartRouter.put('/decreasequantity/:userEmailId', jwtHelper.verifyJwtToken, userCartController.decreaseItemQuantity);

// posting data to cart. we have to pass the verification jwt token as well
cartRouter.put('/:userEmailId/addtocart', jwtHelper.verifyJwtToken, userCartController.addItemToCart);


//Exporting router module.
module.exports = cartRouter;